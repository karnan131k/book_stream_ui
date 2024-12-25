import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIssueBookComponent } from './add-new-issue-book.component';

describe('AddNewIssueBookComponent', () => {
  let component: AddNewIssueBookComponent;
  let fixture: ComponentFixture<AddNewIssueBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewIssueBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewIssueBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
