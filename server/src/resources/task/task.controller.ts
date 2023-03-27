import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ModifyTaskStateDto } from './dto/modify-task-State.dto copy';
import { ModifyTaskDto } from './dto/modify-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /** 获取 task 列表 */
  @Get(':uid')
  async getTasks(
    @Param('uid') uid: string,
    @Query('dateString') dateString?: string,
  ) {
    return this.taskService.tasks(uid, dateString);
  }

  @Post()
  async createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Post('modifyState')
  async modifyTaskState(@Body() dto: ModifyTaskStateDto) {
    return this.taskService.modifyTaskState(dto);
  }

  @Put()
  async modifyTask(@Body() dto: ModifyTaskDto) {
    return this.taskService.modifyTask(dto);
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
