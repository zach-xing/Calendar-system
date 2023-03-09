import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
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
}
