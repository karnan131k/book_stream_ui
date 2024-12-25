import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: false,
  
  templateUrl: './page-heder.component.html',
  styleUrl: './page-heder.component.css'
})
export class PageHeaderComponent {

  @Input() icon?: string;
  
}
