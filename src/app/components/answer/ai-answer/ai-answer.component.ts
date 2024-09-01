import {Component, Input} from "@angular/core";
import {AiEngineService} from "./ai-engine.service";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {Icons} from "../../base/constants";
import {MatButton} from "@angular/material/button";
import {slideToLeft} from "../../base/animations";
import {MatProgressBar} from "@angular/material/progress-bar";
import {environment} from "../../../../environments/environment";

@Component({
  selector: "app-ai-answer",
  standalone: true,
  imports: [
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatCardActions,
    MatButton,
    MatProgressBar,
  ],
  templateUrl: "./ai-answer.component.html",
  animations: [slideToLeft]
})
export class AiAnswerComponent {
  // @ts-ignore
  supportWebGPU = navigator["gpu"];
  @Input({required: true})
  questionBody!: string;
  animateDiscardState: "in" | "out" = "in";
  loadingMessage: string | null = null;
  aiResponse: string = "";
  aiLabel = environment.aiModelLabel;

  protected readonly Icons = Icons;

  constructor(
    private readonly aiService: AiEngineService
  ) {
  }

  async generateAIResponse() {
    this.loadingMessage = $localize`:@@ai_start:Trying to get the AI model`;
    const engine = await this.aiService.createEngine(report => {
      if (report.text.includes("Fetching")) {
        this.loadingMessage = $localize`:@@ai_fetching:Downloading the AI model` + ` ${report.text.match(/\d+%/)}`;
      }
      if (report.text.includes("Loading")) {
        this.loadingMessage = $localize`:@@ai_loading:Loading the AI model from cache` + ` ${report.text.match(/\[\d+\/\d+]/)}`;
      }
    });
    const chunks = await engine.chat.completions.create({
      messages: [
        {role: "user", content: this.questionBody}
      ], stream: true
    });
    for await (const chunk of chunks) {
      this.aiResponse += chunk.choices[0]?.delta.content || "";
    }
  }
}
