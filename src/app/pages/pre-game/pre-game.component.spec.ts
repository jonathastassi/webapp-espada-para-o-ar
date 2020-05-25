/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PreGameComponent } from './pre-game.component';

describe('PreGameComponent', () => {
  let component: PreGameComponent;
  let fixture: ComponentFixture<PreGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
