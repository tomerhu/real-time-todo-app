export interface Task {
    _id?: string;
    title: string;
    completed: boolean;
    isEditing: boolean;
    clientId?: string | null;
    priority?: 'High' | 'Medium' | 'Low';
    dueDate?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }
  