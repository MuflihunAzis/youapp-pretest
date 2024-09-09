import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer'; // pastikan mengimpor Type dari class-transformer
import { User } from '../../auth/schemas/user.schema';
import { Gender } from '../schemas/profile.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Mufli',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Gender of the user',
    example: 'Male',
  })
  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Please enter correct gender.' })
  readonly gender: string;

  @ApiProperty({
    description: 'Birthdate of the user',
    example: '1990-01-01T00:00:00Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly birthday: Date;

  @ApiProperty({
    description: 'Horoscope sign of the user',
    example: 'Aquarius',
  })
  @IsNotEmpty()
  @IsString()
  readonly horoscope: string;

  @ApiProperty({
    description: 'Zodiac sign of the user',
    example: 'Tiger',
  })
  @IsNotEmpty()
  @IsString()
  readonly zodiac: string;

  @ApiProperty({
    description: 'Height of the user in cm',
    example: 180,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Height must be a number' })
  readonly height: number;

  @ApiProperty({
    description: 'Weight of the user in kg',
    example: 75,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Weight must be a number' })
  readonly weight: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
