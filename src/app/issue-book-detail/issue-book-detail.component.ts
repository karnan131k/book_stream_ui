import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse, apiUrl, IssuedBook } from '../menu.model';
import { BookStreamService } from '../book-stream.service';

@Component({
  selector: 'app-issue-book-detail',
  standalone: false,
  
  templateUrl: './issue-book-detail.component.html',
  styleUrl: './issue-book-detail.component.css'
})
export class IssueBookDetailComponent {

  issuedBook: ApiResponse<IssuedBook> | null = null;
  loading = false;
  error: string | null = null;
  basePath: string = apiUrl;

  constructor(
    private route: ActivatedRoute,
    private issuedBookService: BookStreamService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchIssuedBookDetail();
  }

  fetchIssuedBookDetail(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid book ID.';
      return;
    }
  
    this.issuedBookService.getIssuedBookDetail(+id).subscribe({
      next: (response) => {
        this.issuedBook = response;
        this.loading = false;
        this.cd.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        this.error = 'Failed to load book details.';
        this.loading = false;
        this.cd.detectChanges(); // Trigger change detection
      }
    });
  }
}
