import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationSettingsComponent } from './presentation-settings.component';

describe('PresentationSettingsComponent', () => {
  let component: PresentationSettingsComponent;
  let fixture: ComponentFixture<PresentationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
