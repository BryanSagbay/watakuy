import { AuthGuardService } from './../../service/auth-guard.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
import { ImagesLocales } from '../../model/ImagesEvents';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  rutaImagenLocalForm: string = "";

  // Variables para el segundo formulario
  localIdEventoForm: number = 0;
  eventIdEventoForm: number = 0;
  rutaImagenEventoForm: string = "";

  constructor(private authService: AuthService) {}

  agregarFoto() {
    const imagelocal = {
      id_local: this.localIdLocalForm,
      ruta_imagen: this.rutaImagenLocalForm
    };

    this.authService.agregarFotoLocal(imagelocal).subscribe(
      (response) => {
        console.log('Foto agregada al local:', response);
        this.resetFormLocal();
      },
      (error) => {
        console.error('Error al agregar foto al local:', error);
      }
    );
  }

  agregarFotoEvent() {
    this.authService.agregarFotoEvent(this.eventIdEventoForm, this.localIdEventoForm, this.rutaImagenEventoForm).subscribe(
      (response) => {
        console.log('Imagen agregada exitosamente:', response);
        this.resetFormEvento();
      },
      (error) => {
        console.error('Error al agregar imagen:', error);
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
