import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosGameComponent } from './pos-game.component';

describe('PosGameComponent', () => {
  let component: PosGameComponent;
  let fixture: ComponentFixture<PosGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
