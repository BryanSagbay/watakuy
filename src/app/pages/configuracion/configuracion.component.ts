import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { data } from 'jquery';
import { Propietarios } from '../../model/Propietarios';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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
            console.log('Datos actualizados correctamente:', data);
            // Aquí puedes realizar acciones adicionales después de actualizar los datos, como mostrar un mensaje de éxito o redirigir a otra página.
          },
          (error) => {
            console.error('Error al actualizar los datos:', error);
            // Aquí puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje de error al usuario.
          }
        );
    } else {
      console.error('El ID de usuario es nulo');
      // Aquí puedes manejar el caso en el que el ID de usuario sea nulo, como mostrar un mensaje de error al usuario o redirigir a otra página.
    }
  }
}
