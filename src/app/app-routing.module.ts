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

const routes: Routes = [
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
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'issued_book',
        component: IssuedBookComponent
      },
      {
        path: 'add_new_issue_book',
        component: AddNewIssueBookComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'book',
        component: BookComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
