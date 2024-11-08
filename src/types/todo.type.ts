export interface TodoType {
  id: string;
  title: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
}

export type SortOption = 'dueDate' | 'priority' | 'title';
