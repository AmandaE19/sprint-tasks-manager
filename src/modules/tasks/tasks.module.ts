import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service'; // Importando o serviço de tarefas
import { TasksController } from './tasks.controller'; // Importando o controller de tarefas
import { Task, TaskSchema } from './schemas/task.schema'; // Importando o schema da task

@Module({
  imports: [
    // Configuração do Mongoose para a Task
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController], // Definindo o controlador
  providers: [TasksService], // Definindo o serviço
  exports: [TasksService], // Exportando o serviço para ser utilizado em outros módulos
})
export class TasksModule {}
