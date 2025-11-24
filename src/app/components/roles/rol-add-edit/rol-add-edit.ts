import { Component } from '@angular/core';
import { rol } from '../../../models/rol-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-rol-add-edit',
  standalone: false,
  templateUrl: './rol-add-edit.html',
  styleUrl: './rol-add-edit.css',
})
export class RolAddEdit {
 
  crudForm!:FormGroup;
  rolId:number=0;
  roles!:rol[];
  

   
}
