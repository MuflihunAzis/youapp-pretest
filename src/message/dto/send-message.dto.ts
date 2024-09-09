import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'Hello, World!' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

