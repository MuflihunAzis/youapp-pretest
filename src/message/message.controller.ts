import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('messages')
@Controller('api')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('viewMessages')
  @ApiResponse({ status: 200, description: 'Retrieve all messages.' })
  async viewMessages() {
    return this.messageService.getAllMessages();
  }

  @Post('sendMessage')
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  async sendMessage(@Body() body: SendMessageDto) {
    this.messageService.sendMessage(body.content);
    return { status: 'Message sent' };
  }
}
