import { Component } from '@angular/core';
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
        this.imagePreview = response.data.imagePath;
      }
    });
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.apiService.uploadImage(file, 'categories').subscribe((response) => {
        if (response.status === 'SUCCESS' && response.data) {
          this.imagePreview = response.data;
          this.categoryForm.patchValue({ imagePath: response.data });
        }
      });
    }
  }

  onImageRemove(): void {
    if (this.imagePreview) {
      const [folderName, imageNameWithExtension] = this.imagePreview.split('/').slice(-2); // Get folder and file name with extension
      const imageName = imageNameWithExtension.split('.').slice(0, -1).join('.'); // Remove the extension
  
      this.apiService.deleteImage(folderName, imageName).subscribe(() => {
        this.imagePreview = null;
        this.categoryForm.patchValue({ imagePath: null });
      });
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
      this.router.navigate(['/categories']);
    }
  }
  
}
