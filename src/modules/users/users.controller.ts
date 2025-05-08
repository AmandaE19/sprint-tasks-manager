import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import * as bcrypt from 'bcryptjs';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('seed-admin')
  async seedAdmin() {
    const email = 'admin@email.com';
    const plainPassword = '123456';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingAdmin = await this.usersService.findByEmail(email);

    if (existingAdmin) {
      existingAdmin.name = 'Administrador';
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';

      await existingAdmin.save(); // se for um model do mongoose
      return { message: 'Admin atualizado com sucesso', admin: existingAdmin };
    }

    const admin = await this.usersService.create({
      name: 'Administrador',
      email,
      password: hashedPassword,
      role: 'admin',
    });

    return { message: 'Admin criado com sucesso', admin };
  }
}