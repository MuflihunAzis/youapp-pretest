import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'mufli',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'mufli@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Confirm password must be at least 6 characters long' })
  confirmPassword: string;
}
