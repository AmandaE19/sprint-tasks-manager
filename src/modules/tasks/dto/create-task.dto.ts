import { IsString, IsIn, IsOptional, IsMongoId } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsIn(['TODO', 'DOING', 'DONE'])
  status: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsMongoId()
  sprint: string;
}
