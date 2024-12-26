import { Component, ViewChild } from '@angular/core';
import { ApiResponse, apiUrl, Category } from '../menu.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookStreamService } from '../book-stream.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  standalone: false,
  
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>([]);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; // Add a reference to the paginator

  basePath: string = apiUrl;

  constructor(private service: BookStreamService, private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.service.getCategorys().subscribe((response: ApiResponse<Category[]>) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator; // Link paginator
      }
    });
  }

  // Fetch the issued books data from API
  getCategorys(): void {
    this.service.getCategorys().subscribe(response => {
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
  deleteCategory(id: number): void{
    this.service.deleteCategoryDetail(id).subscribe((response)=>{
      if (response.status === 'SUCCESS') {
        this.snackBar.open('Book deleted successfully!', 'Close', { duration: 3000 });
        this.getCategorys();
      }
    })
  }
}
