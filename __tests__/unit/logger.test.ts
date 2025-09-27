import { logger } from "@/lib/logger";

describe("Logger (unit)", () => {
  it("logs debug messages", () => {
    const spy = jest.spyOn(console, "debug").mockImplementation(() => {});
    logger.debug("hello");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[DEBUG]"), "hello");
    spy.mockRestore();
  });

  it("logs error messages", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    logger.error("oops");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"), "oops");
    spy.mockRestore();
  });
});
