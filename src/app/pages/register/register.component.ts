import { Component } from '@angular/core';
import { Propietarios } from '../../model/Propietarios';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent  {
  duenos: Propietarios[] = [];
  newDueno: Propietarios = new Propietarios();

  constructor(private authService: AuthService) {}

  addDueno() {
    this.authService.addDuenoLocal(this.newDueno).subscribe(
      () => {
        Swal.fire({
          title: '¡Propietario agregado!',
          text: 'El propietario ha sido agregado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.newDueno = new Propietarios(); // Limpiar el formulario
        });
      },
      (error) => {
        console.error('Error al agregar propietario:', error);
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error al agregar el propietario. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }
}

