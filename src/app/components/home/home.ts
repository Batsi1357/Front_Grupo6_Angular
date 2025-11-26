import { Component } from '@angular/core';
import { usuario } from '../../models/usuario-model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  

  constructor(private usuarioService:UsuarioService, private router:Router){}



  ngOnInit()
  {
    if(!this.usuarioService.isLogged() )
    {
      this.router.navigate(["/login"]);
    }
  }

}
