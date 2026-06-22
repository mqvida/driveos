import { ConflictException, Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";

interface CreateUserInput {
  email: string;
  passwordHash: string;
  fullName: string;
  consentMarketing: boolean;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new ConflictException("E-mail já cadastrado");

    return this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        profile: {
          create: { fullName: input.fullName },
        },
        consents: {
          createMany: {
            data: [
              { purpose: "LOCATION_TRACKING", granted: false },
              { purpose: "SENSOR_DATA_COLLECTION", granted: false },
              { purpose: "AI_REPORT_GENERATION", granted: false },
              { purpose: "MARKETING", granted: input.consentMarketing },
            ],
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
