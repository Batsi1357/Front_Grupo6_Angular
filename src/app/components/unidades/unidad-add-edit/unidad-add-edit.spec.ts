import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadAddEdit } from './unidad-add-edit';

describe('UnidadAddEdit', () => {
  let component: UnidadAddEdit;
  let fixture: ComponentFixture<UnidadAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnidadAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
