import { Controller, Get } from '@nestjs/common';
import { Character } from '@prisma/client';
import { EventsGateway } from 'src/events/events.gateway';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get('all-characters')
  async getCharacters() {
    return await this.charactersService.characters();
  }
}
