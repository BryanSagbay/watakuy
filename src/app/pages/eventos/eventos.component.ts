import { Eventos } from './../../model/Evetos';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent  {
  selectedDate: string = '';
  selectedEvent: Eventos | null = null;
  evento: Eventos = new Eventos();
  eventos: Eventos[] = [];
  editForm!: FormGroup;

  @ViewChild('calendarModal') calendarModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  // Método para abrir el modal agregar evento
  openModal(timestamp: number) {
    this.selectedDate = new Date(timestamp).toDateString();
    this.modalService.open(this.calendarModal);
  }

  // Método para abrir el modal editar evento
  openModalEditar(evento: Eventos) {
    this.selectedEvent = evento;
    this.editForm.patchValue(evento);
    this.modalService.open(this.editModal);
  }

  // Método para crear un evento
  crearEvento(): void {
    this.authService.crearEvento(this.evento).subscribe(
      (respuesta) => {
        this.modalService.dismissAll();
        this.obtenerEventosDelLocal();
        Swal.fire({
          title: '¡Evento creado!',
          text: 'El evento se creó exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      (error) => {
        Swal.fire({
          title: '¡Error!',
          text: 'Hubo un error al crear el evento. Por favor, inténtelo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  // Método para actualizar un evento
  actualizarEvento(): void {
    if (this.selectedEvent && this.editForm.valid) {
      const eventoActualizado = { ...this.selectedEvent, ...this.editForm.value };
      this.authService.updateEvent(this.selectedEvent.id, eventoActualizado).subscribe(
        (respuesta) => {
          this.modalService.dismissAll();
          this.obtenerEventosDelLocal();
          Swal.fire({
            title: '¡Evento actualizado!',
            text: 'El evento se actualizó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        (error) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un error al actualizar el evento. Por favor, inténtelo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }

  // Método para eliminar un evento
  eliminarEvento(evento: Eventos): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este evento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.eliminarEvento(evento.id).subscribe(
          (respuesta) => {
            console.log('Evento eliminado exitosamente:', respuesta);
            this.obtenerEventosDelLocal();
            Swal.fire({
              title: '¡Evento eliminado!',
              text: 'El evento se eliminó exitosamente.',
              icon: 'success',
              confirmButtonText: 'Ok'
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
  // Método para obtener eventos del local
  obtenerEventosDelLocal(): void {
    this.authService.obtenerEventosDelLocal().subscribe(
      (eventos) => {
        this.eventos = eventos;
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  // Método para inicializar el componente
  ngOnInit(): void {
    this.obtenerEventosDelLocal();
  }

}
