import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks.filterDto';
import { CreateTasksDto } from './dto/createTasksDto';
import { Task, TaskStatus } from './tasks.entity';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter( task => task.status === status)
        }

        if(search) {
            tasks = tasks.filter( task =>
             task.titlee.includes(search) ||
             task.description.includes(search),
             );
        }

        return tasks;
    }

    getTaskById(id: string): Task {
       return this.tasks.find(task => task.id === id);
    }

    createTask(createTasksDto: CreateTasksDto): Task {
        const { titlee, description } = createTasksDto;

        const task: Task = {
            id: uuidv4(),
            titlee,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter( task => task.id !== id );
    }

    updateTasksStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task
    }
}
