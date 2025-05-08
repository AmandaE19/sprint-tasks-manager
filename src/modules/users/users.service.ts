import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({ ...dto, password: hashedPassword });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password');
  }

  async update(id: string, dto: any) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    return this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}