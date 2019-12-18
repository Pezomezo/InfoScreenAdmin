import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualScreensListComponent } from './individual-screens-list.component';

describe('IndividualScreensListComponent', () => {
  let component: IndividualScreensListComponent;
  let fixture: ComponentFixture<IndividualScreensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualScreensListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualScreensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
