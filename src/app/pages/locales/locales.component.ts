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
import Swal from 'sweetalert2';

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
    private router: Router
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
        console.log('Local agregado correctamente:', response);
        Swal.fire({
          title: '¡Local agregado!',
          text: 'El local se agregó exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          this.localForm.reset();
          this.getLocalDetails();
        });
      },
      (error) => {
        console.error('Error al agregar local:', error);
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error al agregar el local. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  // Método para obtener los detalles del local
  getLocalDetails(): void {
    this.authService.getLocalDetails().subscribe(
      (data) => {
        this.local = data;
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
      categoria: local.categoria,
    });
  }

  // Método para guardar los cambios
  guardarCambios(): void {
    if (this.selectedLocal) {
      const id = this.selectedLocal.id;
      const newData = this.localForm.value;
      this.authService.updateLocal(id, newData).subscribe(
        (response) => {
          Swal.fire({
            title: '¡Local actualizado!',
            text: 'El local se actualizó correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.getLocalDetails();
          });
        },
        (error) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un error al actualizar el local. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  // Método para eliminar un local
  deleteLocal(localId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este local?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteLocal(localId).subscribe(
          (response) => {
            Swal.fire({
              title: '¡Local eliminado!',
              text: 'El local se eliminó exitosamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then(() => {
              this.getLocalDetails();
            });
          },
          (error) => {
            Swal.fire({
              title: '¡Error!',
              text: 'Hubo un error al eliminar el local. Por favor, inténtelo de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        );
      }
    });
  }
}
