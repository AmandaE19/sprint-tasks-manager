import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel(dto);
    return task.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().populate('assignedTo').populate('sprint');
  }

  async update(id: string, dto: Partial<UpdateTaskDto>): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<Task| null> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).populate('assignedTo').populate('sprint');
  }

  async findBySprint(sprintName: string): Promise<Task[]> {
    return this.taskModel.find({ 'sprint': sprintName }).exec();
  }

  async findSprints(): Promise<String[]> {
    return this.taskModel.distinct('sprint').exec();
  }
}