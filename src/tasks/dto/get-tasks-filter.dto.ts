import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status?: TaskStatus; // ? is used when its optional
  search?: string;
}
