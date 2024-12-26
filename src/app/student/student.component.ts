import { Component, ViewChild } from '@angular/core';
import { ApiResponse, apiUrl, Student } from '../menu.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookStreamService } from '../book-stream.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: false,
  
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  displayedColumns: string[] = ['studentId', 'studentName', 'email', 'mobile', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; // Add a reference to the paginator

  basePath: string = apiUrl;

  constructor(private service: BookStreamService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.service.getStudents().subscribe((response: ApiResponse<Student[]>) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator; // Link paginator
      }
    });
  }

  // Fetch the issued books data from API
  getStudents(): void {
    this.service.getStudents().subscribe(response => {
      if (response.status === 'SUCCESS' && response.data) {
        this.dataSource.data = response.data;
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator; // Assign the paginator to the dataSource
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
