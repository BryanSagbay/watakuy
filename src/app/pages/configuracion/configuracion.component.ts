import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {
  updateUserForm: FormGroup;
  userId: number | null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.userId = null;
    this.updateUserForm = this.formBuilder.group({
      nombre_propietario: ['', Validators.required],
      apellido_propietario: ['', Validators.required],
      correo_propietario: ['', [Validators.required, Validators.email]],
      telefono_propietario: ['', Validators.required],
      nombre_usuario_propietario: ['', Validators.required],
      contrasena_propietario: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.authService.getDuenoLocal(this.userId)
        .subscribe(
          (data) => {
            this.updateUserForm.patchValue(data);
          },
          (error) => {
            console.error('Error al obtener datos del usuario:', error);
          }
        );
    } else {
      console.error('El ID de usuario es nulo');
    }
  }

  actualizarDatosUsuario() {
    if (this.userId !== null) {
      this.authService.updateUser(this.userId, this.updateUserForm.value)
        .subscribe(
          (data) => {
            Swal.fire({
              title: '¡Datos actualizados!',
              text: 'Los datos del usuario se actualizaron exitosamente.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            // Puedes realizar acciones adicionales aquí después de actualizar los datos.
          },
          (error) => {
            Swal.fire({
              title: '¡Error!',
              text: 'Hubo un error al actualizar los datos. Por favor, inténtelo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        );
    } else {
      console.error('El ID de usuario es nulo');
    }
  }
}
