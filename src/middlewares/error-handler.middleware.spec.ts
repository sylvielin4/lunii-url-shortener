import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { errorHandlerMiddleware } from "./error-handler.middleware";

function createMockRes() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };

  return res as typeof res & Response;
}

describe("errorHandlerMiddleware", () => {
  const next = jest.fn();

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should map AppError to its status code and message", () => {
    const res = createMockRes();

    errorHandlerMiddleware(
      new BadRequestError("invalid url"),
      {} as Request,
      res,
      next
    );

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "invalid url" });
  });

  it("should map NotFoundError to 404", () => {
    const res = createMockRes();

    errorHandlerMiddleware(
      new NotFoundError("missing"),
      {} as Request,
      res,
      next
    );

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "missing" });
  });

  it("should hide unexpected errors behind a 500 response", () => {
    const res = createMockRes();

    errorHandlerMiddleware(new Error("boom"), {} as Request, res, next);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
    expect(console.error).toHaveBeenCalled();
  });
});
