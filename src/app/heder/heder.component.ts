import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './heder.component.html',
  styleUrl: './heder.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Admin';

  // constructor(private authService: AuthService) { }

  logout(): void {
    console.log('Logged out');
  }

}
