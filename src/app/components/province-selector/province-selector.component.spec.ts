import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceSelectorComponent } from './province-selector.component';

describe('ProvinceSelectorComponent', () => {
  let component: ProvinceSelectorComponent;
  let fixture: ComponentFixture<ProvinceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
