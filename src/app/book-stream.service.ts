import { Injectable } from '@angular/core';
import { ApiResponse, apiUrl, Author, Book, Category, IssuedBook, Student } from './menu.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStreamService {

  apiUrl = apiUrl;
  baseUrl: any;

  constructor(
    private http: HttpClient
  ) { }

  // image upload
  uploadImage(file: File, folderName: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderName', folderName);
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/upload-image`, formData);
  }
  
  deleteImage(folderName: string, imageName: string) {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/remove-image?folderName=${folderName}&imageName=${imageName}`);
  }

  // issuedBooks
  getIssuedBooks(): Observable<ApiResponse<IssuedBook[]>> {
    return this.http.get<ApiResponse<IssuedBook[]>>(`${this.apiUrl}/api/issuedBooks`);
  }

  
  getIssuedBookDetail(id: number): Observable<ApiResponse<IssuedBook>> {
    return this.http.get<ApiResponse<IssuedBook>>(`${this.apiUrl}/api/issuedBooks/${id}`);
  }

  updateIssuedBookDetail(payload: any, id: number): Observable<ApiResponse<IssuedBook>> {
    return this.http.put<ApiResponse<IssuedBook>>(`${this.apiUrl}/api/issuedBooks/${id}`, payload);
  }

  deleteIssuedBookDetail(id: number): Observable<ApiResponse<IssuedBook>> {
    return this.http.delete<ApiResponse<IssuedBook>>(`${this.apiUrl}/api/issuedBooks/${id}`);
  }

  createIssuedBookDetail(payload: any): Observable<ApiResponse<IssuedBook>> {
    return this.http.post<ApiResponse<IssuedBook>>(`${this.apiUrl}/api/IssuedBooks`, payload);
  }

  // author
  getAuthors(): Observable<ApiResponse<Author[]>> {
    return this.http.get<ApiResponse<Author[]>>(`${this.apiUrl}/api/authors`);
  }

  getAuthorDetail(id: number): Observable<ApiResponse<Author>> {
    return this.http.get<ApiResponse<Author>>(`${this.apiUrl}/api/authors/${id}`);
  }

  updateAuthorDetail(payload: any, id: number): Observable<ApiResponse<Author>> {
    return this.http.put<ApiResponse<Author>>(`${this.apiUrl}/api/authors/${id}`, payload);
  }

  deleteAuthorDetail(id: number): Observable<ApiResponse<Author>> {
    return this.http.delete<ApiResponse<Author>>(`${this.apiUrl}/api/authors/${id}`);
  }

  createAuthorDetail(payload: any): Observable<ApiResponse<Author>> {
    return this.http.post<ApiResponse<Author>>(`${this.apiUrl}/api/authors`, payload);
  }

  // category
  getCategorys(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/api/categories`);
  }

  getCategoryDetail(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/api/categories/${id}`);
  }

  updateCategoryDetail(payload: any, id: number): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${this.apiUrl}/api/categories/${id}`, payload);
  }

  deleteCategoryDetail(id: number): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(`${this.apiUrl}/api/categories/${id}`);
  }

  createCategoryDetail(payload: any): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(`${this.apiUrl}/api/categories`, payload);
  }

  // Book
  getBooks(): Observable<ApiResponse<Book[]>> {
    return this.http.get<ApiResponse<Book[]>>(`${this.apiUrl}/api/books`);
  }

  getBookDetail(id: number): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(`${this.apiUrl}/api/books/${id}`);
  }

  updateBookDetail(payload: any, id: number): Observable<ApiResponse<Book>> {
    return this.http.put<ApiResponse<Book>>(`${this.apiUrl}/api/books/${id}`, payload);
  }

  deleteBookDetail(id: number): Observable<ApiResponse<Book>> {
    return this.http.delete<ApiResponse<Book>>(`${this.apiUrl}/api/books/${id}`);
  }

  createBookDetail(payload: any): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>(`${this.apiUrl}/api/books`, payload);
  }

  // student
  getStudents(): Observable<ApiResponse<Student[]>> {
    return this.http.get<ApiResponse<Student[]>>(`${this.apiUrl}/api/students`);
  }

  getStudentDetail(id: number): Observable<ApiResponse<Student>> {
    return this.http.get<ApiResponse<Student>>(`${this.apiUrl}/api/students/${id}`);
  }

  updateStudentDetail(payload: any, id: number): Observable<ApiResponse<Student>> {
    return this.http.put<ApiResponse<Student>>(`${this.apiUrl}/api/students/${id}`, payload);
  }

  deleteStudentDetail(id: number): Observable<ApiResponse<Student>> {
    return this.http.delete<ApiResponse<Student>>(`${this.apiUrl}/api/students/${id}`);
  }

  createStudentDetail(payload: any): Observable<ApiResponse<Student>> {
    return this.http.post<ApiResponse<Student>>(`${this.apiUrl}/api/students`, payload);
  }

}
