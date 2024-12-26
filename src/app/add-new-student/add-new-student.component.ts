import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookStreamService } from '../book-stream.service';
import { ActivatedRoute, Router } from '@angular/router';
import { apiUrl } from '../menu.model';

@Component({
  selector: 'app-add-new-student',
  standalone: false,
  
  templateUrl: './add-new-student.component.html',
  styleUrl: './add-new-student.component.css'
})
export class AddNewStudentComponent {

  studentForm!: FormGroup;
  isEditMode = false;
  studentId!: number;
  uploadedImagePath: string | null = null;
  imagePreviewUrl: string | null = null;
  basePath: string = apiUrl;

  constructor(
    private fb: FormBuilder,
    private studentService: BookStreamService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      imagePath: [''],
    });

    // Check route ID for edit or add
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = +id;
      this.loadStudentDetails(this.studentId);
    } else {
      this.generateStudentId();
    }
  }

  loadStudentDetails(id: number): void {
    this.studentService.getStudentDetail(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.studentForm.patchValue(response.data);
          this.uploadedImagePath = response.data.imagePath;
          this.imagePreviewUrl = `${this.basePath}${response.data.imagePath}`;
        }
      },
      error: (err) => console.error(err),
    });
  }

  generateStudentId(): void {
    this.studentService.generateNextStudentId().subscribe({
      next: (response) => {
        this.studentForm.get('studentId')?.setValue(response.data);
      },
      error: (err) => console.error(err),
    });
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string; // Show preview immediately
      };
      reader.readAsDataURL(file);

      this.studentService.uploadImage(file, 'student').subscribe({
        next: (response) => {
          console.log(response.data)
          this.uploadedImagePath = response.data;
          this.imagePreviewUrl = `${this.basePath}${response.data}`; // Full URL for rendering
          this.studentForm.get('imagePath')?.setValue(response.data);
          this.cdr.detectChanges();
          console.log(this.uploadedImagePath)
          console.log(this.imagePreviewUrl)
        },
        error: (err) => console.error(err),
      });
    }
    console.log(this.uploadedImagePath)
    console.log(this.imagePreviewUrl)
  }

  deleteImage(): void {
    if (this.uploadedImagePath) {
      // Remove the file extension (.png, .jpg, etc.) before extracting folderName and imageName
      const imagePathWithoutExtension = this.uploadedImagePath.replace(/\.[^/.]+$/, ""); 
      const [folderName, imageName] = imagePathWithoutExtension.split('/').slice(-2);
      
      this.studentService.deleteImage(folderName, imageName).subscribe({
        next: () => {
          this.uploadedImagePath = null;
          this.imagePreviewUrl = null;
          this.studentForm.get('imagePath')?.setValue('');
        },
        error: (err) => console.error(err),
      });
    }
  }

  resetForm(): void {
    this.studentForm.reset();
    this.imagePreviewUrl = null;
    this.uploadedImagePath = null;
    if (!this.isEditMode) {
      this.generateStudentId(); // Regenerate Student ID for Add Mode
    } else {
      this.loadStudentDetails(this.studentId); // Reload existing details for Edit Mode
    }
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      return;
    }
    const studentData = this.studentForm.value;
    if (this.isEditMode) {
      this.studentService.updateStudentDetail(studentData, this.studentId).subscribe({
        next: () => {
          alert('Student updated successfully!');
          this.resetForm();
          this.router.navigate(['/students']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.studentService.createStudentDetail(studentData).subscribe({
        next: () => {
          alert('Student created successfully!');
          this.resetForm();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
