import { catchError } from 'rxjs';
import { Todo } from '../model/todo.type';
import { TodosService } from './../services/todos.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todosService = inject(TodosService);

  todoItems = signal<Array<Todo>>([]);
  ngOnInit(): void {
    this.todosService.getTodosFromApi()
      .pipe(
        catchError((err)=>{
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos)=>{
        this.todoItems.set(todos);
      })
  }
}
