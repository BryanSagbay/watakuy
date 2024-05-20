import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Locales } from '../../model/Locales';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css',
})
export class LocalesComponent implements OnInit {
  localForm!: FormGroup;
  local: Locales | undefined;
  selectedLocal: Locales | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.localForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      logo: ['', Validators.required],
      categoria: ['', Validators.required],
    });
    this.getLocalDetails();
  }

  // Método para agregar un local
  onSubmit(): void {
    if (this.localForm.invalid) {
      return;
    }

    this.authService.addLocal(this.localForm.value).subscribe(
      (response: Locales) => {
        // Tipa la respuesta como Locales
        console.log('Local agregado correctamente:', response);
        // Limpiar el formulario después de agregar el local
        this.localForm.reset();
      },
      (error) => {
        console.error('Error al agregar local:', error);
      }
    );
  }

  // Método para obtener los detalles del local
  getLocalDetails(): void {
    this.authService.getLocalDetails().subscribe(
      (data) => {
        this.local = data;
        console.log('Detalles del local:', this.local);
      },
      (error) => {
        console.error('Error al obtener los detalles del local:', error);
      }
    );
  }

  // Método para abrir el modal de edición
  openEditModal(local: Locales): void {
    this.selectedLocal = local;
    // Carga los datos del local seleccionado en el formulario
    this.localForm.patchValue({
      id: local.id,
      nombre: local.nombre,
      direccion: local.direccion,
      telefono: local.telefono,
      categoria: local.categoria
    });
  }

  // Método para guardar los cambios
  guardarCambios(): void {
    if (this.selectedLocal) {
      const id = this.selectedLocal.id;
      const newData = this.localForm.value;
      this.authService.updateLocal(id, newData).subscribe(
        (response) => {
          console.log('Local actualizado correctamente:', response);
          // Actualizar la lista de locales después de la actualización
          this.getLocalDetails();
        },
        (error) => {
          console.error('Error al actualizar el local:', error);
        }
      );
    }
  }

  // Método para eliminar un local
  deleteLocal(localId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este local?')) {
      this.authService.deleteLocal(localId).subscribe(
        (response) => {
          console.log('Local deleted successfully:', response);
        },
        (error) => {
          console.error('Error deleting local:', error);
        }
      );
    }
  }

}
