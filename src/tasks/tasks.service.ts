import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // if we do not mention private, it is by default public. Can directly access it as TasksService.tasks and is available throughout the application and can be changed or mutated
  // type of tasks is Taask array (that we defined in model)

  getAllTasks(): Task[] {
    // public. Result is an array of tasks of type Task array
    return this.tasks; // we have method to get tasks. So tasks are not directly editable elsewhere
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // this.tasks = this.tasks.map((task) => {
    //   if (task.id === id) {
    //     return { ...task, status: status };
    //   } else return task;
    // });
    // return this.tasks.find((task) => task.id === id);
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
