import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAddEdit } from './usuarios-add-edit';

describe('UsuariosAddEdit', () => {
  let component: UsuariosAddEdit;
  let fixture: ComponentFixture<UsuariosAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
