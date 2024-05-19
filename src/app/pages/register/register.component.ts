import { Component } from '@angular/core';
import { Propietarios } from '../../model/Propietarios';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent  {
  duenos: Propietarios[] = [];
  newDueno: Propietarios = new Propietarios();

  constructor(private authService: AuthService) {}

  addDueno() {
    this.authService.addDuenoLocal(this.newDueno).subscribe(() => {
      this.newDueno = new Propietarios(); // Limpiar el formulario
    });
  }


}
