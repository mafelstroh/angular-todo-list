import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {

  constructor() { }

  // Inicializa o sinal de estado de todos
  public todosState = signal<Array<Todo>>([]);

  // Atualiza a lista de todos
  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description !== null) || undefined) {
      // Cria um novo array com o todo adicionado
      const updatedTodos = [...this.todosState(), new Todo(id, title, description, done)];
      this.todosState.set(updatedTodos);  // Define o novo estado usando `set`
      this.saveTodosInLocalStorage();     // Salva no LocalStorage
    }
  }

  // Salva os todos no LocalStorage
  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todosState());
    if (todos) {
      localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
    }
  }
}
