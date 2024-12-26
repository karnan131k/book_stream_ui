export interface MenuItem {
    title?: string;
    icon?: string;
    link?: string;
    color?: string;
    expanded?: boolean;
    subMenu?: MenuItem[];
  }
  
  export type Menu = MenuItem[];

  export const apiUrl: string = "http://localhost:8888"; // Update the host URL as required
  
  export interface ApiResponse<T> {
    currentPage: number;
    totalPages: number;
    status: Status;
    data: T | null;
    error: ErrorDetails | null;
  }
  
  export enum Status {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PARTIAL_SUCCESS = "PARTIAL_SUCCESS",
    EXCEPTION = "EXCEPTION"
  }
  
  export interface ErrorDetails {
    code: string;
    message: string;
    fieldErrors?: FieldError[];
  }
  
  export interface FieldError {
    field: string;
    message: string;
  }
  
  export interface Author {
    id: number; // Represents Long in Java
    name: string;
    imagePath: string;
    books?: Book[]; // Optional property with a list of Book
  }
  
  export interface Book {
    id: number;
    title: string;
    imagePath: string;
    stockCount: number; // Total number of books available
    category?: Category; // Optional reference to Category
    author?: Author; // Optional reference to Author
    issuedBooks?: IssuedBook[]; // Optional property with a list of IssuedBook
  }
  
  export interface Category {
    id: number;
    name: string;
    imagePath: string;
    books?: Book[]; // Optional property with a list of Book
  }
  
  export interface IssuedBook {
    id: number;
    count: number; // Number of books issued
    duration: number; // Duration in days
    issueDate: string; // Use ISO 8601 string format for LocalDate (e.g., "YYYY-MM-DD")
    book?: Book; // Optional reference to Book
    student?: Student; // Optional reference to Student
  }
  
  export interface Student {
    id: number;
    name: string;
    studentId: string; // Unique identifier for a student
    imagePath: string;
    email: string; // Ensure email validation
    mobile: string;
    issuedBooks?: IssuedBook[]; // Optional property with a list of IssuedBook
  }  

  // AuthorRequestDTO
export interface AuthorRequestDTO {
  name: string;
  imagePath: string;
}

// BookRequestDTO
export interface BookRequestDTO {
  title: string;
  imagePath: string;
  stockCount: number;
  categoryId: number; // Assuming Long is mapped to number in TypeScript
  authorId: number;
}

// CategoryRequestDTO
export interface CategoryRequestDTO {
  name: string;
  imagePath: string;
}

// IssuedBookRequestDTO
export interface IssuedBookRequestDTO {
  count: number;
  duration: number;
  issueDate: string; // ISO 8601 date format (e.g., "2023-12-25")
  bookId: number;
  studentId: number;
}

// StudentRequestDTO
export interface StudentRequestDTO {
  name: string;
  studentId: string;
  imagePath: string;
  email: string;
  mobile: string;
}
