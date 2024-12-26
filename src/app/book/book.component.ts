import { Component, ViewChild } from '@angular/core';
import { ApiResponse, apiUrl, Book } from '../menu.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookStreamService } from '../book-stream.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: false,
  
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  displayedColumns: string[] = ['id', 'title', 'stockCount', 'categoryName', 'authorName',  'actions'];
  dataSource = new MatTableDataSource<Book>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; // Add a reference to the paginator

  basePath: string = apiUrl;

  constructor(private service: BookStreamService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.service.getBooks().subscribe((response: ApiResponse<Book[]>) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator; // Link paginator
        // this.dataSource.filterPredicate = (data: Book, filter: string): boolean => {
        //   const searchString = filter.trim().toLowerCase();
        //   return (
        //     data.title?.toLowerCase().includes(searchString) ||
        //     data.category?.name?.toLowerCase().includes(searchString) ||
        //     data.author?.name?.toLowerCase().includes(searchString)
        //   );
        // };
      }
    });
  }

  // Fetch the issued books data from API
  getBooks(): void {
    this.service.getBooks().subscribe(response => {
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
