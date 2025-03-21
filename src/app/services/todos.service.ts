import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  http = inject(HttpClient);

  constructor() { }

  getTodosFromApi(){
    const url:string = `https://jsonplaceholder.typicode.com/todos/`;
    return this.http.get<Array<Todo>>(url)
  }
}
