import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { Router } from '@angular/router';
import { usuario } from '../../models/usuario-model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!:FormGroup;

  constructor (private usuarioService:UsuarioService,  private formBuilder:FormBuilder  , private router:Router) {}

  ngOninit()
  {
    this.CargarFormulario();
  }


  CargarFormulario(){
  this.loginForm=this.formBuilder.group(
    {
      username:[""],
      password:[""]
    }
  )
  }

  Ingresar(){
    const usuario:usuario={
      idUsuario:0,
      Username:this.loginForm.get("username")?.value,
      Password:this.loginForm.get("password")?.value,
      activo:this.loginForm.get("pastivo")?.value
    }
    
    this.usuarioService.login(usuario).subscribe(
      {
      next:()=>{
        this.router.navigate(["/home"]);
      }
    }
    )


  }
   
  
 
}
