import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  selectedDate: string = '';
  @ViewChild('calendarModal') calendarModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  openModal(timestamp: number) {
    this.selectedDate = new Date(timestamp).toDateString();
    this.modalService.open(this.calendarModal);
  }
}
