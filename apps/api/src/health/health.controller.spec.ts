import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { TerminusModule, HealthCheckService, MemoryHealthIndicator } from "@nestjs/terminus";
import { HealthController } from "./health.controller.js";

describe("HealthController", () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
    }).compile();

    controller = module.get(HealthController);
  });

  it("GET /health retorna status ok", async () => {
    const result = await controller.check();
    expect(result.status).toBe("ok");
  });

  it("GET /health retorna status error quando verifica falha", async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: async () => ({ status: "error", details: {} }),
          },
        },
        {
          provide: MemoryHealthIndicator,
          useValue: { checkHeap: async () => ({}) },
        },
      ],
    }).compile();

    const c = module.get(HealthController);
    const result = await c.check();
    expect(result.status).toBe("error");
  });
});
