import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStreamService } from '../book-stream.service';
import { apiUrl, CategoryRequestDTO } from '../menu.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-category',
  standalone: false,
  
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css'
})
export class AddNewCategoryComponent {

  categoryForm!: FormGroup;
  imagePreview: string | null = null;
  isEditMode = false;
  currentCategoryId: number | null = null;
  basePath: string = apiUrl;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: BookStreamService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Determine mode (add or edit) based on the URL ID
    this.currentCategoryId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.currentCategoryId;

    if (this.isEditMode && this.currentCategoryId) {
      this.loadCategoryDetails(this.currentCategoryId);
    }
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      imagePath: [null, Validators.required],
    });
  }

  loadCategoryDetails(id: number): void {
    this.apiService.getCategoryDetail(id).subscribe((response) => {
      if (response.status === 'SUCCESS' && response.data) {
        this.categoryForm.patchValue({
          name: response.data.name,
          imagePath: response.data.imagePath,
        });
        this.imagePreview = this.basePath + response.data.imagePath;
      }
    });
  }

  onImageUpload(event: Event, fileInput: HTMLInputElement): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.apiService.uploadImage(file, 'category').subscribe(
        (response) => {
          if (response.status === 'SUCCESS' && response.data) {
            this.imagePreview = `${this.basePath}${response.data}`;
            this.categoryForm.patchValue({ imagePath: response.data });
            console.log(this.imagePreview);
            // Reset the file input to allow re-selection of the same file
            fileInput.value = '';
            this.cdr.detectChanges();
          }
        },
        (error) => {
          console.error('Image upload failed:', error);
          // Optionally show an error message to the user
        }
      );
    }
  }

  onImageRemove(fileInput: HTMLInputElement): void {
    if (this.imagePreview) {
      const [folderName, imageNameWithExtension] = this.imagePreview.split('/').slice(-2);
      const imageName = imageNameWithExtension.split('.').slice(0, -1).join('.');
  
      this.apiService.deleteImage(folderName, imageName).subscribe(
        () => {
          this.imagePreview = null;
          this.categoryForm.patchValue({ imagePath: null });
  
          // Reset the file input
          fileInput.value = '';
        },
        (error) => {
          console.error('Image deletion failed:', error);
          // Optionally show an error message to the user
        }
      );
    }
  }
  

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const payload: CategoryRequestDTO = this.categoryForm.value;

    if (this.isEditMode && this.currentCategoryId) {
      this.apiService.updateCategoryDetail(payload, this.currentCategoryId).subscribe((response) => {
        if (response.status === 'SUCCESS') {
          this.snackBar.open('Category updated successfully!', 'Close', { duration: 3000 });
          this.resetForm();
          this.router.navigate(['/category']);
        }
      });
    } else {
      this.apiService.createCategoryDetail(payload).subscribe((response) => {
        if (response.status === 'SUCCESS') {
          this.snackBar.open('Category created successfully!', 'Close', { duration: 3000 });
          this.resetForm();
        }
      });
    }
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.imagePreview = null;
    if (!this.isEditMode) {
      this.router.navigate(['/add_new_category']);
    }
  }
  
}
