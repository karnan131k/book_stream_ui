import { Component } from '@angular/core';
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
        this.previewImage = author.imagePath;
      }
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const folderName = 'authors';
      this.authorService.uploadImage(file, folderName).subscribe(
        response => {
          this.previewImage = response.data!;
          this.authorForm.get('imagePath')?.setValue(response.data!);
          this.imageError = null;
        },
        error => {
          this.imageError = 'Failed to upload image. Please try again.';
        }
      );
    }
  }

  removeImage() {
    if (this.previewImage) {
      const folderName = 'authors';
      const imageName = this.previewImage.split('/').pop()?.split('.')[0];
      this.authorService.deleteImage(folderName, imageName!).subscribe(() => {
        this.previewImage = null;
        this.authorForm.get('imagePath')?.reset();
      });
    }
  }

  onSubmit() {
    const payload: AuthorRequestDTO = this.authorForm.value;
    if (this.isEditMode) {
      this.authorService.updateAuthorDetail(payload, this.authorId).subscribe(() => {
        this.snackBar.open('Author updated successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        
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
