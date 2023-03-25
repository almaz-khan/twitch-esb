import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, PrismaService],
})
export class CharactersModule {}
