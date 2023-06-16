import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit{
  ngOnInit(): void {

  }
  @Output() showCategory = new EventEmitter<string>();

  categories = [
    'Ноутбуки',
    'Мониторы',
    'Принтеры',
    'Клавиатуры',
    'Мышки',
    'Сканеры'
  ];

  onShowCategory(category: string):void {
   this.showCategory.emit(category);
  }
}
