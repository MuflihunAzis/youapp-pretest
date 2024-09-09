import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private messages = []; // This could be an array or connected to a database

  getAllMessages() {
    // For testing, returning a mock array of messages
    return this.messages; 
  }

  sendMessage(content: string) {
    // Add a new message to the array
    this.messages.push({ id: this.messages.length + 1, content });
  }
}

