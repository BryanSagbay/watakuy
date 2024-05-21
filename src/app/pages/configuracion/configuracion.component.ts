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
export class ConfiguracionComponent{
duenoLocal: any;
userId: number | null = null; // Inicializar userId como null

constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtener el ID del usuario del local storage
    const userId = this.authService.getUserId();

    // Verificar si se obtuvo el ID del usuario
    if (userId) {
      // Llamar al método para obtener los datos del dueño local por ID
      this.authService.getDuenoLocal(userId)
        .subscribe(
          (data) => {
            // Manejar la respuesta del servidor aquí
            console.log(data);
          },
          (error) => {
            // Manejar errores aquí
            console.error(error);
          }
        );
    }
  }


}
