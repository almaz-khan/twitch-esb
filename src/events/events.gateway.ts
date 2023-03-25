import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('vote')
  async voteForChar(
    @MessageBody() charId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const token: string = client.handshake.auth.token;
    const userId: string = client.handshake.auth.userId;

    if (!userId || !token) {
      return;
    }

    const secret = new Buffer(process.env.JWT_SECRET, 'base64');

    if (!this.jwtService.verify(token, { secret: secret })) {
      return;
    }
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });

    if (user && user.id) {
      return;
    }

    const char = await this.prisma.character.findUnique({
      where: { id: charId },
    });

    const addedUser = await this.prisma.user.create({
      data: {
        userId: userId,
        character: { connect: { id: char.id } },
      },
    });

    const updatedChar = await this.prisma.character.update({
      where: { id: char.id },
      data: {
        voters: { connect: { userId: addedUser.userId } },
      },
    });

    this.server.emit('vote', updatedChar);
  }
}
