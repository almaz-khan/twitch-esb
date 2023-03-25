import { Controller, Get } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}
  @Get('all-characters')
  getCharacters(): string {
    return this.charactersService.getCharacters();
  }
}
