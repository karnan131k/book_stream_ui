import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-layout',
  standalone: false,
  
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Issued Book',
      icon: 'description',
      link: '/issued_book',
      color: '#ff7f0e',
    },
    {
      title: 'Student',
      icon: 'person',
      link: '/student',
      color: '#ff7f0e',
    },
    {
      title: 'Book',
      icon: 'library_books',
      link: '/book',
      color: '#ff7f0e',
    },
    {
      title: 'Category',
      icon: 'category',
      link: '/category',
      color: '#ff7f0e',
    },
    {
      title: 'Author',
      icon: 'perm_identity',
      link: '/author',
      color: '#ff7f0e',
    }
  ];

}
