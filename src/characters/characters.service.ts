import { Injectable } from '@nestjs/common';

@Injectable()
export class CharactersService {
  getCharacters(): string {
    return 'Characters';
  }
}
