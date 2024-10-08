import axios from 'axios';

const baseUrl = 'https://todo-caio.azurewebsites.net/api/';
const requestBase = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  targetId: number;
}

interface Target {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export const getAllTargets = async (): Promise<Target[]> => {
  const response = await requestBase.get('Targets');
  return response.data;
};

export const createTarget = async (target: Omit<Target, 'id'>): Promise<Target> => {
  const response = await requestBase.post('Targets', target);
  return response.data;
};

export const updateTarget = async (targetId: number, target: Partial<Target>): Promise<void> => {
  await requestBase.put(`Targets/${targetId}`, target);
};

export const deleteTarget = async (targetId: number): Promise<void> => {
  await requestBase.delete(`Targets/${targetId}`);
};

export const getTodosByTarget = async (targetId: number): Promise<Todo[]> => {
  const response = await requestBase.get(`Targets/${targetId}`);
  return response.data.todo;
};
export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await requestBase.post('Todo', todo);
  return response.data;
};

export const updateTodo = async (todoId: number, todo: Partial<Todo>): Promise<void> => {
  await requestBase.put(`Todo/${todoId}`, todo);
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  await requestBase.delete(`Todo/${todoId}`);
};

export const getTodoById = async (todoId: number): Promise<Todo> => {
  const response = await requestBase.get(`Todo/${todoId}`);
  return response.data;
};
