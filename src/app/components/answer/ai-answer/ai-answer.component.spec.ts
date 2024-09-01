import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AiAnswerComponent} from "./ai-answer.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AiEngineService} from "./ai-engine.service";
import {Chat, ChatCompletionChunk, MLCEngine} from "@mlc-ai/web-llm";
import {Completions} from "@mlc-ai/web-llm/lib/openai_api_protocols/chat_completion";

describe("AiAnswerComponent", () => {
  let component: AiAnswerComponent;
  let fixture: ComponentFixture<AiAnswerComponent>;
  let aiService: AiEngineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAnswerComponent],
      providers: [provideAnimations()]
    })
      .compileComponents();

    aiService = TestBed.inject(AiEngineService);
    fixture = TestBed.createComponent(AiAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should generate AI response", (done) => {
    const expected = "AI";
    const result: AsyncIterable<ChatCompletionChunk> = {
      async* [Symbol.asyncIterator]() {
        yield {choices: [{delta: {content: expected}}]} as ChatCompletionChunk;
        yield {choices: [{delta: {content: null}}]} as ChatCompletionChunk;
      }
    };
    const completions = jasmine.createSpyObj<Completions>(["create"]);
    completions.create.and.returnValue(Promise.resolve(result));
    const chat = jasmine.createSpyObj<Chat>([], {
      completions
    });
    const engine = jasmine.createSpyObj<MLCEngine>([], {
      chat
    });
    spyOn(aiService, "createEngine").and.callFake(async (callback) => {
      callback({text: "Fetching", progress: 1, timeElapsed: 1});
      callback({text: "Loading", progress: 1, timeElapsed: 1});
      return engine;
    });
    component.generateAIResponse().then(() => {
      expect(component.aiResponse).toBe(expected);
      done();
    });
  });
});
