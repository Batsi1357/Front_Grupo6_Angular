import { Component } from '@angular/core';
import { UnidadService } from '../../../services/unidad-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { unidad } from '../../../models/unidad-model';

@Component({
  selector: 'app-unidad-add-edit',
  standalone: false,
  templateUrl: './unidad-add-edit.html',
  styleUrl: './unidad-add-edit.css',
})
export class UnidadAddEdit 
{
}
