export type PriorityType = 'high' | 'medium' | 'low';

export interface TodoType {
  id: string;
  title: string;
  dueDate: Date | string;
  priority: PriorityType;
}

export type SortOptionType = 'dueDate' | 'priority' | 'title';
