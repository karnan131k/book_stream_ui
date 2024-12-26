import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBookDetailComponent } from './issue-book-detail.component';

describe('IssueBookDetailComponent', () => {
  let component: IssueBookDetailComponent;
  let fixture: ComponentFixture<IssueBookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueBookDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
