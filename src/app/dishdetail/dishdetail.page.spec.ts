import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishdetailPage } from './dishdetail.page';

describe('DishdetailPage', () => {
  let component: DishdetailPage;
  let fixture: ComponentFixture<DishdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
