import { AuthGuardService } from './../../service/auth-guard.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
import { ImagesLocales } from '../../model/ImagesEvents';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fotos.component.html',
  styleUrl: './fotos.component.css'
})
export class FotosComponent {
  // Variables para el primer formulario
  localIdLocalForm: number = 0;
  rutaImagenLocalForm: string = '';

  // Variables para el segundo formulario
  localIdEventoForm: number = 0;
  eventIdEventoForm: number = 0;
  rutaImagenEventoForm: string = '';

  constructor(private authService: AuthService) {}

  agregarFoto() {
    const imagelocal = {
      id_local: this.localIdLocalForm,
      ruta_imagen: this.rutaImagenLocalForm
    };

    this.authService.agregarFotoLocal(imagelocal).subscribe(
      (response) => {
        this.resetFormLocal();
        Swal.fire({
          title: '¡Foto agregada!',
          text: 'La foto se agregó exitosamente al local.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      (error) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error al agregar la foto al local. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  agregarFotoEvent() {
    this.authService.agregarFotoEvent(this.eventIdEventoForm, this.localIdEventoForm, this.rutaImagenEventoForm).subscribe(
      (response) => {
        this.resetFormEvento();
        Swal.fire({
          title: '¡Imagen agregada!',
          text: 'La imagen se agregó exitosamente al evento.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      (error) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error al agregar la imagen al evento. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  resetFormLocal() {
    this.localIdLocalForm = 0;
    this.rutaImagenLocalForm = '';
  }

  resetFormEvento() {
    this.localIdEventoForm = 0;
    this.eventIdEventoForm = 0;
    this.rutaImagenEventoForm = '';
  }
}
