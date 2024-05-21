import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  nombrePropietario: string = '';
  userId: number | null;
  saludo: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userId = null;
  }

  // Método para cerrar sesión con confirmación y alerta de SweetAlert
  confirmLogout(event: Event): void {
    event.preventDefault();

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }
  // Método para obtener el nombre del propietario
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.authService.getNombrePropietario(this.userId).subscribe(
        (data) => {
          this.nombrePropietario = data.nombre_propietario;
          this.saludo = this.getSaludo();
        },
        (error) => {
          console.error('Error al obtener datos del usuario:', error);
        }
      );
    } else {
      console.error('El ID de usuario es nulo');
    }
  }

  //Método para obtener el saludo según la hora del día
  getSaludo(): string {
    const horaActual = new Date().getHours();
    if (horaActual >= 6 && horaActual < 12) {
      return 'Buenos días';
    } else if (horaActual >= 12 && horaActual < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }
}
