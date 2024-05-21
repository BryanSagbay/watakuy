import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginObj).subscribe(
      (res) => {
        if (res.access_token) {
          Swal.fire({
            title: '¡Inicio de sesión exitoso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => {
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', res.user_id);
            this.router.navigateByUrl('/inicio');
          });
        } else {
          Swal.fire({
            title: '¡Credenciales inválidas!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        Swal.fire({
          title: '¡Error!',
          text: 'Error al iniciar sesión',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

}
export class Login {
  nombre_usuario_propietario: string = '';
  contrasena_propietario: string = '';
}

