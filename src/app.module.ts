import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule, CharactersModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule {}
