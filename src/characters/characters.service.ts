import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async characters(): Promise<Character[]> {
    return this.prisma.character.findMany();
  }
}
