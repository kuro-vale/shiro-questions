import {Injectable} from "@angular/core";
import {CreateMLCEngine, InitProgressCallback, MLCEngine} from "@mlc-ai/web-llm";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AiEngineService {
  engine: MLCEngine | null = null;

  constructor() {
  }

  async createEngine(initProgressCallback: InitProgressCallback) {
    if (this.engine) return this.engine;

    return this.engine = await CreateMLCEngine(
      environment.aiModel,
      {initProgressCallback: initProgressCallback}
    );
  }
}
