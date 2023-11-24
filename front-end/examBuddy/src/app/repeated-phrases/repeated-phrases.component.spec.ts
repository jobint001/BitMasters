import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedPhrasesComponent } from './repeated-phrases.component';

describe('RepeatedPhrasesComponent', () => {
  let component: RepeatedPhrasesComponent;
  let fixture: ComponentFixture<RepeatedPhrasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatedPhrasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatedPhrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
