import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private prisma: PrismaService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('vote')
  async voteForChar(@MessageBody() charId: number) {
    const char = await this.prisma.character.findUnique({
      where: { id: charId },
    });

    const updatedChar = await this.prisma.character.update({
      where: { id: char.id },
      data: { votes: char.votes + 1 },
    });

    this.server.emit('vote', updatedChar);
  }
}
