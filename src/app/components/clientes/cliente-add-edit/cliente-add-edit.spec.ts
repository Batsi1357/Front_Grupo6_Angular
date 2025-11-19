import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAddEdit } from './cliente-add-edit';

describe('ClienteAddEdit', () => {
  let component: ClienteAddEdit;
  let fixture: ComponentFixture<ClienteAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
