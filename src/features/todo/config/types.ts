export interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  softDelete: boolean;
  userId: number;
  createdAt: Date;
}
