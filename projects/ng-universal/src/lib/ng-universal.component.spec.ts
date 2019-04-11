import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgUniversalComponent } from './ng-universal.component';

describe('NgUniversalComponent', () => {
  let component: NgUniversalComponent;
  let fixture: ComponentFixture<NgUniversalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgUniversalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgUniversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
