import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks.filterDto';
import { Task, TaskStatus } from './tasks.entity';
import { CreateTasksDto } from './dto/createTasksDto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        const task = this.tasksService.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    
    @Post()
    createTask(@Body() createTasksDto: CreateTasksDto): Task {
        return this.tasksService.createTask(createTasksDto);
    }

    @Delete('/:id')
async deleteTask(@Param('id') id: string): Promise<{ success: boolean }> {
    const deleted = await this.tasksService.deleteTask(id);
    if (!deleted) {
        throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { success: true };
}


    @Patch('/:id/status')
    async updateTasksStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Promise<Task> {
        const task = await this.tasksService.updateTasksStatus(id, status);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
}
