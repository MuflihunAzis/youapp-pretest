import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer'; 
import { User } from '../../auth/schemas/user.schema';
import { Gender } from '../schemas/profile.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Mufli',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Gender of the user',
    example: 'Male',
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender, { message: 'Please enter correct category.' })
  readonly gender: string;

  @ApiProperty({
    description: 'Birthday of the user',
    example: '1995-06-15',
    required: false,
  })
  @IsOptional()
  @Type(() => Date) // Mengonversi string JSON ke Date object
  @IsDate({ message: 'Birthday must be a valid Date instance' }) // Validasi date
  readonly birthday: Date;

  @ApiProperty({
    description: 'Horoscope sign of the user',
    example: 'Gemini',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly horoscope: string;

  @ApiProperty({
    description: 'Zodiac sign of the user',
    example: 'Goat',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly zodiac: string;

  @ApiProperty({
    description: 'Height of the user in cm',
    example: 165,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Height must be a number' })
  readonly height: number;

  @ApiProperty({
    description: 'Weight of the user in kg',
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Weight must be a number' })
  readonly weight: number;

  @ApiProperty({
    description: 'User information, this field should not be passed',
    example: null,
    readOnly: true,
  })
  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
