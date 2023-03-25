import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CharactersModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule {}
