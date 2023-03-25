import { Controller, Get, Req } from '@nestjs/common';
import { Character } from '@prisma/client';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get('all-characters')
  async getCharacters(@Req() request): Promise<Character[]> {
    const userId = request.headers['user-id'];
    const token = request.headers['token'];

    return await this.charactersService.characters(token, userId);
  }
}
