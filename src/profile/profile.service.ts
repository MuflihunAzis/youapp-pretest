import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Profile } from './schemas/profile.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
  ) {}

  async findAll(query: Query): Promise<Profile[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const profiles = await this.profileModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return profiles;
  }

  async create(profile: Profile, user: User): Promise<Profile> {
    const data = Object.assign(profile, { user: user._id });

    const res = await this.profileModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Profile> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const profile = await this.profileModel.findById(id);

    if (!profile) {
      throw new NotFoundException('Book not found.');
    }

    return profile;
  }

  async updateById(id: string, profile: Profile): Promise<Profile> {
    return await this.profileModel.findByIdAndUpdate(id, profile, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Profile> {
    return await this.profileModel.findByIdAndDelete(id);
  }
}
