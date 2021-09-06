import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranTranslationComponent } from './quran-translation.component';

describe('QuranTranslationComponent', () => {
  let component: QuranTranslationComponent;
  let fixture: ComponentFixture<QuranTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuranTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
