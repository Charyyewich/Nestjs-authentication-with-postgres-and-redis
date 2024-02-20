import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks.filterDto';
import { Task, TaskStatus } from './tasks.entity';
import { CreateTasksDto } from './dto/createTasksDto';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
        ) {}

@Get()
   async getTasks(@Query() filterDto: GetTasksFilterDto): Promise <Task[]> {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        } else {
            return this.tasksService.getAllTasks();
        }
 }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }
    
    @Post()
    createTask(@Body() createTasksDto: CreateTasksDto): Task {
        return this.tasksService.createTask(createTasksDto);
    }

    @Delete()
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch()
    updateTasksStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,): Task {
            return this.tasksService.updateTasksStatus(id, status);
        }
}
