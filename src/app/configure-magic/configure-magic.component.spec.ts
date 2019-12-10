import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMagicComponent } from './configure-magic.component';

describe('ConfigureMagicComponent', () => {
  let component: ConfigureMagicComponent;
  let fixture: ComponentFixture<ConfigureMagicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureMagicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
