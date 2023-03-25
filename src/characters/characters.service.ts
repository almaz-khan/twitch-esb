import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async characters(token: string, userId: string): Promise<Character[]> {
    const chars = await this.prisma.character.findMany();

    if (
      token &&
      !this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
    ) {
      userId = '';
    }

    console.log(userId);

    return chars.map((char) => {
      return {
        ...char,
        // isMyVote: char.voters.includes(userId),
      };
    });
  }
}
