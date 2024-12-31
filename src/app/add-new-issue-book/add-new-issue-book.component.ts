import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { ApiResponse, apiUrl, Book, IssuedBookRequestDTO, Student } from '../menu.model';
import { BookStreamService } from '../book-stream.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-issue-book',
  standalone: false,
  
  templateUrl: './add-new-issue-book.component.html',
  styleUrl: './add-new-issue-book.component.css'
})
export class AddNewIssueBookComponent {

  issuedBookForm!: FormGroup;
  books$!: Observable<Book[]>;
  students$!: Observable<Student[]>;
  isEditMode: boolean = false; // Flag to check if we are in edit mode
  issuedBookId: number | null = null; // Store the ID for editing
  basePath: string = apiUrl;

  constructor(
    private fb: FormBuilder,
    private service: BookStreamService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, // To get route parameters
    private router: Router // To navigate if needed
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.issuedBookForm = this.fb.group({
      count: [1, [Validators.required, Validators.min(1)]],
      duration: [3, [Validators.required, Validators.min(1)]],
      issueDate: ['', [Validators.required]],
      bookId: [null, [Validators.required]],
      studentId: [null, [Validators.required]],
    });

    // Fetch books and students
    
  // Fetch books and students
  this.books$ = this.service.getBooks().pipe(
    map((response: ApiResponse<Book[]>) => response.data || []), // Extract Book[] from ApiResponse
    filter((data): data is Book[] => data !== null) // Ensure data is not null
  );

  this.students$ = this.service.getStudents().pipe(
    map((response: ApiResponse<Student[]>) => response.data || []), // Extract Student[] from ApiResponse
    filter((data): data is Student[] => data !== null) // Ensure data is not null
  );

    // Check if we are editing by getting the ID from the route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.issuedBookId = +id; // Convert string to number
        this.isEditMode = true;
        this.loadIssuedBookDetails(this.issuedBookId);
      }
    });
  }

  // Fetch the issued book details by ID and update the form
  loadIssuedBookDetails(id: number): void {
    this.service.getIssuedBookDetail(id).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS' && response.data) {
          const issuedBook = response.data;
          // Populate the form with the existing data
          this.issuedBookForm.patchValue({
            count: issuedBook.count,
            duration: issuedBook.duration,
            issueDate: new Date(issuedBook.issueDate), // Ensure correct date format
            bookId: issuedBook.book?.id,
            studentId: issuedBook.student?.id,
          });
        }
      },
      error: () => {
        this.snackBar.open('Failed to load issued book details.', 'Close', { duration: 3000 });
      },
    });
  }

  onSubmit(): void {
    if (this.issuedBookForm.invalid) {
      return;
    }

    const payload: IssuedBookRequestDTO = this.issuedBookForm.value;

    if (this.isEditMode && this.issuedBookId !== null) {
      // If in edit mode, update the existing issued book
      this.service.updateIssuedBookDetail(payload, this.issuedBookId).subscribe({
        next: (response) => {
          if (response.status === 'SUCCESS') {
            this.snackBar.open('Issued book updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/issued_book']);
          }
        },
        error: () => {
          this.snackBar.open('Failed to update issued book.', 'Close', { duration: 3000 });
        },
      });
    } else {
      // If in create mode, create a new issued book
      this.service.createIssuedBookDetail(payload).subscribe({
        next: (response) => {
          if (response.status === 'SUCCESS') {
            this.snackBar.open('Issued book created successfully!', 'Close', { duration: 3000 });
            this.issuedBookForm.reset();
          }
        },
        error: () => {
          this.snackBar.open('Failed to create issued book.', 'Close', { duration: 3000 });
        },
      });
    }
  }
}
