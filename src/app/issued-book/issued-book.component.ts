import { Component, ViewChild } from '@angular/core';
import { ApiResponse, apiUrl, IssuedBook } from '../menu.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookStreamService } from '../book-stream.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-issued-book',
  standalone: false,
  
  templateUrl: './issued-book.component.html',
  styleUrl: './issued-book.component.css'
})
export class IssuedBookComponent {

  displayedColumns: string[] = ['studentId', 'studentName', 'count', 'duration', 'issueDate', 'bookTitle',  'actions'];
  dataSource = new MatTableDataSource<IssuedBook>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; // Add a reference to the paginator

  basePath: string = apiUrl;

  constructor(private service: BookStreamService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.service.getIssuedBooks().subscribe((response: ApiResponse<IssuedBook[]>) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator; // Link paginator
        this.dataSource.filterPredicate = (data: IssuedBook, filter: string): boolean => {
          const searchString = filter.trim().toLowerCase();
          return (
            data.book?.title?.toLowerCase().includes(searchString) ||
            data.student?.name?.toLowerCase().includes(searchString) ||
            data.student?.studentId?.toLowerCase().includes(searchString) ||
            data.book?.author?.name?.toLowerCase().includes(searchString) ||
            data.issueDate?.toString().toLowerCase().includes(searchString) ||
            data.count.toString().includes(searchString) ||
            data.duration.toString().includes(searchString)
          );
        };
      }
    });
  }

  // Fetch the issued books data from API
  getIssuedBooks(): void {
    this.service.getIssuedBooks().subscribe(response => {
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
