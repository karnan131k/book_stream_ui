import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./heder/heder.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { PageHeaderComponent } from "./page-heder/page-heder.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IssuedBookComponent } from "./issued-book/issued-book.component";
import { StudentComponent } from "./student/student.component";
import { BookComponent } from "./book/book.component";
import { CategoryComponent } from "./category/category.component";
import { AddNewIssueBookComponent } from "./add-new-issue-book/add-new-issue-book.component";
import { SigninComponent } from "./signin/signin.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthInterceptor } from "./auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSort, MatSortModule } from "@angular/material/sort";
import { TestComponent } from './test/test.component';
import { MatInputModule } from "@angular/material/input";
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    MenuItemComponent,
    PageHeaderComponent,
    DashboardComponent,
    IssuedBookComponent,
    StudentComponent,
    BookComponent,
    CategoryComponent,
    AddNewIssueBookComponent,
    SigninComponent,
    NotFoundComponent,
    ForbiddenComponent,
    TestComponent,
    AddNewBookComponent,
    AddNewCategoryComponent,
    AddNewStudentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSort,
    MatSortModule,
    MatInputModule
    
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
