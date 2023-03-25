import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from './events.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [EventsGateway, PrismaService, JwtService],
})
export class EventsModule {}
