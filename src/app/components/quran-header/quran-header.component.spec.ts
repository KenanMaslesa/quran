import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranHeaderComponent } from './quran-header.component';

describe('QuranHeaderComponent', () => {
  let component: QuranHeaderComponent;
  let fixture: ComponentFixture<QuranHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuranHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
