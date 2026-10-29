import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { Todo } from './entities/todo.entity.js';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private nextId = 1;

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: dto.title,
      done: false,
    };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  update(id: number, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, dto);
    return todo;
  }

  remove(id: number): void {
    const todo = this.findOne(id);
    this.todos = this.todos.filter((item) => item.id !== todo.id);
  }
}
