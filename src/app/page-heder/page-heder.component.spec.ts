import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHederComponent } from './page-heder.component';

describe('PageHederComponent', () => {
  let component: PageHederComponent;
  let fixture: ComponentFixture<PageHederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageHederComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
