import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async characters(token: string, userId: string): Promise<Character[]> {
    const chars = await this.prisma.character.findMany({
      include: { voters: true },
    });

    if (
      token &&
      !this.jwtService.verify(token, {
        secret: new Buffer(process.env.JWT_SECRET, 'base64'),
      })
    ) {
      userId = '';
    }

    return chars.map((char) => {
      const { voters, ...rest } = char;

      return {
        ...rest,
        votes: voters.length,
        isMyVote: voters.some((user) => user.userId === userId),
      };
    });
  }
}
