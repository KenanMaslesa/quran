import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuqyahComponent } from './ruqyah.component';

describe('RuqyahComponent', () => {
  let component: RuqyahComponent;
  let fixture: ComponentFixture<RuqyahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuqyahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuqyahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
