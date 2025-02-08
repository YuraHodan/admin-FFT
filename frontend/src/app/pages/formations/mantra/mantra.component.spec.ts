import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantraComponent } from './mantra.component';

describe('MantraComponent', () => {
  let component: MantraComponent;
  let fixture: ComponentFixture<MantraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
