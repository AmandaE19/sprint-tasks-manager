import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto'; // DTO para criação de tarefa
import { UpdateTaskDto } from './dto/update-task.dto'; // DTO para atualização de tarefa
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Guard de autenticação JWT
import { RolesGuard } from '../../common/guards/roles.guard'; // Guard para controle de roles
import { Roles } from '../../common/decorators/roles.decorator'; // Decorador para atribuição de roles
import { Task } from './schemas/task.schema'; // Importando o schema da Task

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard) // Protegendo as rotas com JWT e roles
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  // Criando uma nova tarefa
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto); // Criando a tarefa através do serviço
  }

  // Obtendo todas as tarefas
  @Get()
  @Roles('admin', 'common') // Permitindo acesso a tarefas tanto para admins quanto para usuários
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll(); // Buscando todas as tarefas
  }

  // Encontrar todas as sprints
  @Get('sprints')
  @Roles('admin', 'common')
  findSprints(): Promise<String[]> {
    return this.tasksService.findSprints();
  }

  // Encontrando tarefas por sprint
  @Get('sprint/:sprintName')
  @Roles('admin', 'common') // Permitindo a busca por tarefas vinculadas a uma sprint
  findBySprint(@Param('sprintName') sprintName: string): Promise<Task[]> {
    return this.tasksService.findBySprint(sprintName); // Buscando tarefas pela sprint
  }

  // Atualizando uma tarefa existente
  @Put('/:id')
  @Roles('admin') // Restringindo a atualização das tarefas para administradores
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<Task | null> {
    return this.tasksService.update(id, dto); // Atualizando a tarefa pelo serviço
  }

  @Patch('/:id/responsible')
  @Roles('admin', 'common')
  updateResponsible(
    @Param('id') id: string,
    @Body('assignedTo') assignedTo: string
  ): Promise<Task | null> {
    return this.tasksService.update(id, { assignedTo });
  }

  @Patch('/:id/status')
  @Roles('admin', 'common')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string
  ): Promise<Task | null> {
    return this.tasksService.update(id, { status });
  }

  // Deletando uma tarefa
  @Delete(':id')
  @Roles('admin') // Permitindo a exclusão de tarefas apenas para administradores
  remove(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.remove(id); // Deletando a tarefa pelo serviço
  }
}
