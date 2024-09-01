import {TestBed} from "@angular/core/testing";

import {AiEngineService} from "./ai-engine.service";

describe("AiServiceService", () => {
  let service: AiEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiEngineService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should create engine", () => {
    service.createEngine(() => {
    });
    expect().nothing();
  });

  it("should return cached engine", () => {
    const expected = {} as any;
    service.engine = expected;
    service.createEngine(() => {
    });
    expect(service.engine).toBe(expected);
  });
});
