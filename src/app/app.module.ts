import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './heder/heder.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { PageHeaderComponent } from './page-heder/page-heder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuedBookComponent } from './issued-book/issued-book.component';
import { StudentComponent } from './student/student.component';
import { BookComponent } from './book/book.component';
import { CategoryComponent } from './category/category.component';
import { AddNewIssueBookComponent } from './add-new-issue-book/add-new-issue-book.component';
import { SigninComponent } from './signin/signin.component';
import { FlexLayoutModule} from '@angular/flex-layout';

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
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatMenuModule,
    RouterModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }