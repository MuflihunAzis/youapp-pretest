import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  sendToAll(content: string) {
    this.server.emit('message', content);
  }
}
