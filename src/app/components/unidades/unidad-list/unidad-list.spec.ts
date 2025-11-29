import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadList } from './unidad-list';

describe('UnidadList', () => {
  let component: UnidadList;
  let fixture: ComponentFixture<UnidadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnidadList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
