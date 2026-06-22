import "reflect-metadata";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service.js";
import { UsersService } from "../users/users.service.js";

const mockUser = {
  id: "cuid_1",
  email: "test@example.com",
  passwordHash: "$2b$12$hash",
  role: "CONSUMER" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("AuthService", () => {
  let service: AuthService;
  let usersService: { create: ReturnType<typeof vi.fn>; findByEmail: ReturnType<typeof vi.fn> };
  let jwtService: { sign: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    usersService = { create: vi.fn(), findByEmail: vi.fn() };
    jwtService = { sign: vi.fn().mockReturnValue("mock_token") };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe("register()", () => {
    it("cria usuário e retorna accessToken", async () => {
      usersService.create.mockResolvedValue(mockUser);

      const result = await service.register({
        email: "test@example.com",
        password: "senha123",
        fullName: "Teste",
        consentMarketing: false,
      });

      expect(result).toEqual({ accessToken: "mock_token" });
      expect(usersService.create).toHaveBeenCalledOnce();
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      });
    });

    it("propaga ConflictException quando e-mail já existe", async () => {
      usersService.create.mockRejectedValue(new ConflictException("E-mail já cadastrado"));

      await expect(
        service.register({
          email: "dup@example.com",
          password: "senha123",
          fullName: "Dup",
          consentMarketing: false,
        })
      ).rejects.toThrow(ConflictException);
    });
  });

  describe("login()", () => {
    it("retorna accessToken com credenciais corretas", async () => {
      const bcrypt = await import("bcrypt");
      const hash = await bcrypt.hash("senha123", 1);
      usersService.findByEmail.mockResolvedValue({ ...mockUser, passwordHash: hash });

      const result = await service.login({ email: "test@example.com", password: "senha123" });
      expect(result).toEqual({ accessToken: "mock_token" });
    });

    it("lança UnauthorizedException com senha incorreta", async () => {
      const bcrypt = await import("bcrypt");
      const hash = await bcrypt.hash("outrasenha", 1);
      usersService.findByEmail.mockResolvedValue({ ...mockUser, passwordHash: hash });

      await expect(
        service.login({ email: "test@example.com", password: "senha_errada" })
      ).rejects.toThrow(UnauthorizedException);
    });

    it("lança UnauthorizedException com e-mail inexistente", async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: "naoexiste@example.com", password: "qualquer" })
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
