import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStreamService } from '../book-stream.service';
import { apiUrl, AuthorRequestDTO } from '../menu.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-author',
  standalone: false,
  
  templateUrl: './add-new-author.component.html',
  styleUrl: './add-new-author.component.css'
})
export class AddNewAuthorComponent {

  authorForm!: FormGroup;
  previewImage: string | null = null;
  imageError: string | null = null;
  isEditMode = false;
  authorId!: number;
  basePath: string = apiUrl;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorService: BookStreamService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      this.authorId = params['id'];
      this.isEditMode = !!this.authorId;
      if (this.isEditMode) {
        this.loadAuthorData();
      }
    });
  }

  initForm() {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      imagePath: ['']
    });
  }

  loadAuthorData() {
    this.authorService.getAuthorDetail(this.authorId).subscribe(response => {
      const author = response.data;
      if (author) {
        this.authorForm.patchValue(author);
        this.previewImage = this.basePath + author.imagePath;
      }
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Please upload a valid image file.';
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB size limit
        this.imageError = 'Image size must be less than 5MB.';
        return;
      }
  
      const folderName = 'author';
      this.authorService.uploadImage(file, folderName).subscribe(
        response => {
          this.previewImage = `${this.basePath}${response.data!}`;
          this.authorForm.get('imagePath')?.setValue(response.data!);
          this.imageError = null;
          event.target.value = ''; // Reset file input
          this.cdr.detectChanges();
        },
        error => {
          this.imageError = 'Failed to upload image. Please try again.';
          event.target.value = ''; // Reset file input
        }
      );
    }
  }
  

  removeImage(): void {
    if (this.previewImage) {
      const folderName = 'author';
      const imageName = this.previewImage.split('/').pop()?.split('.')[0];
  
      if (imageName) {
        // Optimistically update UI before the API call completes
        const previousImage = this.previewImage;
        this.previewImage = null; // Update the UI immediately
        this.authorForm.get('imagePath')?.reset();
  
        this.authorService.deleteImage(folderName, imageName).subscribe(
          () => {
            // Success: Do nothing as UI is already updated
          },
          (error) => {
            // On error, revert to the previous state
            this.previewImage = previousImage;
            this.authorForm.get('imagePath')?.setValue(previousImage);
            this.imageError = 'Failed to remove image. Please try again.';
          }
        );
      }
    }
  }

  onSubmit() {
    const payload: AuthorRequestDTO = this.authorForm.value;
    if (this.isEditMode) {
      this.authorService.updateAuthorDetail(payload, this.authorId).subscribe(() => {
        this.snackBar.open('Author updated successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        this.router.navigate(['/author']);
      });
    } else {
      this.authorService.createAuthorDetail(payload).subscribe(() => {
        this.snackBar.open('Author updated successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        
      });
    }
  }

  resetForm() {
    this.authorForm.reset();
    this.previewImage = null;
  }
  
}
