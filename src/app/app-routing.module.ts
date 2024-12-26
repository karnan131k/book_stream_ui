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
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
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
        path: 'student',
        component: StudentComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'book',
        component: BookComponent,
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: { roles: ['ROLE_ADMIN'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
