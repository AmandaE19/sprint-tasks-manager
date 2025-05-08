import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import * as dotenv from 'dotenv';
import { TasksModule } from './modules/tasks/tasks.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
