import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [CharactersModule],
  providers: [],
})
export class AppModule {}
