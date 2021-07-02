import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdvAppComponent } from './pdv-app.component';

describe('PdvAppComponent', () => {
  let component: PdvAppComponent;
  let fixture: ComponentFixture<PdvAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdvAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdvAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
