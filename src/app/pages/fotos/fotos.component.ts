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
  eventId: number = 0;
  localId: number = 0;
  rutaImagen: string = "";

  constructor(private authService: AuthService) {}

  agregarFoto() {
    const imagelocal: ImagesLocales = {
      id_local: this.localId,
      ruta_imagen: this.rutaImagen
    };

    this.authService.agregarFotoLocal(imagelocal).subscribe(
      (response) => {
        console.log('Foto agregada al local:', response);
      },
      (error) => {
        console.error('Error al agregar foto al local:', error);
      }
    );
  }

  agregarFotoEvent(eventId: number, localId: number, rutaImagen: string) {
    this.authService.agregarFotoEvent(eventId, localId, rutaImagen).subscribe(
      (response) => {
        console.log('Imagen agregada exitosamente:', response);
      },
      (error) => {
        console.error('Error al agregar imagen:', error);
      }
    );
  }
}

