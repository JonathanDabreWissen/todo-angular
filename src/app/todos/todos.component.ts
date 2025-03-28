import { catchError } from 'rxjs';
import { Todo } from '../model/todo.type';
import { TodosService } from './../services/todos.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms'
import { FilterTodosPipe } from '../pipes/filter-todos.pipe';
@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todosService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');

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

  updateTodoItem(todoItem: Todo){
    this.todoItems.update((todos)=>{
      return todos.map(todo =>{
        if(todo.id === todoItem.id){
          return {
            ...todo,
            completed:!todo.completed
          }
        }
        return todo;
      })
    })
  }
}
