import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import swal from'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router) { }


  fgValidacion = this.fb.group({
    correo:['',[Validators.required,Validators.email]],
    clave: ['', [Validators.required]]
  });



  ngOnInit(): void {
  }
  identificarUsuario(){

      let usuario = this.fgValidacion.controls["correo"].value;
      let clave = this.fgValidacion.controls["clave"].value;
      let claveCifrada = cryptoJS.MD5(clave).toString();
   
      this.seguridadService.login(usuario, claveCifrada).subscribe(
        (data: any) => {
          this.seguridadService.almacenarSesion(data)
          this.router.navigate(['/index']);
        },
        (error: any) => {
          console.log(error)
          swal.fire({
            icon: 'error',
            title: 'Upps...',
            text: 'Tu usuario o contraseña son inválidos!'
          })
          //codigo por defecto 
          //alert("Datos inválidos");
        }
        );
      }
  
  }

