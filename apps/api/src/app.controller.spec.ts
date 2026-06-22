import "reflect-metadata";
import { describe, it, expect, beforeEach } from "vitest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";

describe("AppController", () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get(AppController);
  });

  it("GET / retorna mensagem de status", () => {
    const result = controller.getRoot();
    expect(result).toEqual({ message: "DriveOS API — OK" });
  });

  it("GET / propaga erro quando serviço falha", async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getRoot: () => {
              throw new Error("falha de serviço simulada");
            },
          },
        },
      ],
    }).compile();

    const brokenController = module.get(AppController);
    expect(() => brokenController.getRoot()).toThrow("falha de serviço simulada");
  });
});
