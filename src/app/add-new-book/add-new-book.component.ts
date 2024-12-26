import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStreamService } from '../book-stream.service';
import { apiUrl, Author, BookRequestDTO, Category } from '../menu.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-book',
  standalone: false,
  
  templateUrl: './add-new-book.component.html',
  styleUrl: './add-new-book.component.css'
})
export class AddNewBookComponent {

  bookForm!: FormGroup;
  isEditMode = false;
  categories: Category[] = [];
  authors: Author[] = [];
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  basePath: string = apiUrl;

  constructor(
    private fb: FormBuilder,
    private apiService: BookStreamService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.params['id'];
    this.isEditMode = !!bookId;
  
    // Initialize the form
    this.initForm();
  
    // Fetch authors and categories
    this.apiService.getAuthors().subscribe((res) => (this.authors = res.data || []));
    this.apiService.getCategorys().subscribe((res) => (this.categories = res.data || []));
  
    if (this.isEditMode) {
      this.apiService.getBookDetail(bookId).subscribe((res) => {
        if (res.status === "SUCCESS" && res.data) {
          // Ensure `res.data` is not null
          this.bookForm.patchValue({
            title: res.data.title || '',
            imagePath: res.data.imagePath || '',
            stockCount: res.data.stockCount || 0,
            categoryId: res.data.category?.id || null,
            authorId: res.data.author?.id || null,
          });
          this.imagePreview = res.data.imagePath;
        }
      });
    }
  }

  initForm() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      stockCount: [0, [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      authorId: ['', Validators.required],
      imagePath: [''],
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    if (this.imagePreview) {
      const imageNameWithExtension = this.imagePreview.split('/').pop() || ''; // Extract the full image name with extension
      const imageName = imageNameWithExtension.split('.').slice(0, -1).join('.'); // Remove the extension
  
      if (this.isEditMode) {
        this.apiService.deleteImage('book', imageName).subscribe(() => {
          this.imagePreview = null;
          this.selectedImage = null;
        });
      } else {
        this.imagePreview = null;
        this.selectedImage = null;
      }
    }
  }
  

  resetForm() {
    this.bookForm.reset();
    this.imagePreview = null;
    this.selectedImage = null;
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const payload = { ...this.bookForm.value };

    if (this.selectedImage) {
      this.apiService.uploadImage(this.selectedImage, 'book').subscribe((res) => {
        payload.imagePath = res.data;

        this.saveOrUpdate(payload);
      });
    } else {
      this.saveOrUpdate(payload);
    }
  }

  saveOrUpdate(payload: BookRequestDTO) {
    if (this.isEditMode) {
      const bookId = this.route.snapshot.params['id'];
      this.apiService.updateBookDetail(payload, bookId).subscribe(() => {
        this.snackBar.open('book created successfully!', 'Close', { duration: 3000 });
            this.bookForm.reset();
      });
    } else {
      this.apiService.createBookDetail(payload).subscribe(() => this.resetForm());
    }
  }
  
}
