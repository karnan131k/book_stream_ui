import { Component, ViewChild } from '@angular/core';
import { ApiResponse, apiUrl, Author } from '../menu.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookStreamService } from '../book-stream.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-author',
  standalone: false,
  
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Author>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; // Add a reference to the paginator

  basePath: string = apiUrl;

  constructor(private service: BookStreamService, private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.service.getAuthors().subscribe((response: ApiResponse<Author[]>) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator; // Link paginator
      }
    });
  }

  // Fetch the issued books data from API
  getAuthors(): void {
    this.service.getAuthors().subscribe(response => {
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
  deleteAuthor(id: number): void{
    this.service.deleteAuthorDetail(id).subscribe((response)=>{
      if (response.status === 'SUCCESS') {
        this.snackBar.open('Author deleted successfully!', 'Close', { duration: 3000 });
        this.getAuthors();
      }
    })
  }
}
