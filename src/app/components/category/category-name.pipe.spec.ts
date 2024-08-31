import {CategoryNamePipe} from "./category-name.pipe";

describe("CategoryNamePipe", () => {
  it("create an instance", () => {
    const pipe = new CategoryNamePipe();
    expect(pipe).toBeTruthy();
  });

  it("should get translation", () => {
    const pipe = new CategoryNamePipe();
    const category = "Animals";
    const result = pipe.transform(category);
    expect(result).toBe(category);
  });
});
