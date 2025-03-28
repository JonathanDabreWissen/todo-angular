import { UpperCasePipe } from '@angular/common';
import { HighlightCompletedTodoDirective } from './../../directives/highlight-completed-todo.directive';
import { Todo } from './../../model/todo.type';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodoDirective, UpperCasePipe],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>();

  todoToggled = output<Todo>();

  todoClicked(){
    this.todoToggled.emit(this.todo());
  }
}
