import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users-profile')
@Controller('api')
export class ProfileController {
  
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get('/getProfile')
  async getAllProfiles(@Query() query: ExpressQuery): Promise<Profile[]> {
    return this.profileService.findAll(query);
  }

  @Post('/createProfile')
  @UseGuards(AuthGuard())
  async createProfile(
    @Body()
    profile: CreateProfileDto,
    @Req() req,
  ): Promise<Profile> {
    return this.profileService.create(profile, req.user);
  }

  // @Get(':id')
  // async getProfile(
  //   @Param('id')
  //   id: string,
  // ): Promise<Profile> {
  //   return this.profileService.findById(id);
  // }

  @Put('/updateProfile/:id')
  async updateProfile(
    @Param('id')
    id: string,
    @Body()
    profile: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileService.updateById(id, profile);
  }

  // @Delete(':id')
  // async deleteProfile(
  //   @Param('id')
  //   id: string,
  // ): Promise<Profile> {
  //   return this.profileService.deleteById(id);
  // }
}
