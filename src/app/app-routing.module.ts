import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { IssuedBookComponent } from './issued-book/issued-book.component';
import { StudentComponent } from './student/student.component';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';
import { AddNewIssueBookComponent } from './add-new-issue-book/add-new-issue-book.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth.guard';
import { TestComponent } from './test/test.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { IssueBookDetailComponent } from './issue-book-detail/issue-book-detail.component';
import { AuthorComponent } from './author/author.component';
import { AddNewAuthorComponent } from './add-new-author/add-new-author.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'author',
        component: AuthorComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'add_new_author',
        component: AddNewAuthorComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'edit-author/:id',
        component: AddNewAuthorComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'issued_book',
        component: IssuedBookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'add_new_issue_book',
        component: AddNewIssueBookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      { 
        path: 'edit-issue-book/:id', 
        component: AddNewIssueBookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      }, 
      { path: 'view-issued-book/:id', 
        component: IssueBookDetailComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'student',
        component: StudentComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'add_new_student',
        component: AddNewStudentComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'edit_student/:id',
        component: AddNewStudentComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'book',
        component: BookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'add_new_book',
        component: AddNewBookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'edit_book/:id',
        component: AddNewBookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'add_new_category',
        component: AddNewCategoryComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'edit_category/:id',
        component: AddNewCategoryComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
