import { TaskStatus } from "../tasks.entity";

export class GetTasksFilterDto{
    status: TaskStatus;
    search: string;
}