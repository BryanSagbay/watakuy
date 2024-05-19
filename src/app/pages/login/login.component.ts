import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
          alert("Inicio de sesión exitoso");
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', res.user_id);
          this.router.navigateByUrl('/inicio');
        } else {
          alert("Credenciales inválidas");
        }
      },
      (error) => {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión");
      }
    );
  }
}

export class Login {
  nombre_usuario_propietario: string = '';
  contrasena_propietario: string = '';
}

