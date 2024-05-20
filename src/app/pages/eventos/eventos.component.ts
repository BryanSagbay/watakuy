import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Eventos } from '../../model/Evetos';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent {
  selectedDate: string = '';
  evento: Eventos = new Eventos();
  eventos: Eventos[] = [];

  eventoForm!: FormGroup;

  @ViewChild('calendarModal') calendarModal!: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  // Método para abrir el modal
  openModal(timestamp: number) {
    this.selectedDate = new Date(timestamp).toDateString();
    this.modalService.open(this.calendarModal);
  }

  // Método para crear un evento
  crearEvento(): void {
    this.authService.crearEvento(this.evento).subscribe(
      (respuesta) => {
        console.log('Evento creado exitosamente:', respuesta);
      },
      (error) => {
        console.error('Error al crear evento:', error);
      }
    );
  }

  // Método para obtener eventos del local
  ngOnInit(): void {
    this.obtenerEventosDelLocal();
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


}
