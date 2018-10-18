import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcomponentComponent } from './acomponent.component';

describe('AcomponentComponent', () => {
  let component: AcomponentComponent;
  let fixture: ComponentFixture<AcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
