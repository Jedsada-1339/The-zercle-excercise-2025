import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenFilterComponent } from './gen-filter.component';

describe('GenFilterComponent', () => {
  let component: GenFilterComponent;
  let fixture: ComponentFixture<GenFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
