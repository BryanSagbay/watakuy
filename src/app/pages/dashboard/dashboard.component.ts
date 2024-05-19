import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Locales } from '../../model/Locales';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  localForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.localForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      logo: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.localForm.invalid) {
      return;
    }

    this.authService.addLocal(this.localForm.value).subscribe(
      (response: Locales) => { // Tipa la respuesta como Locales
        console.log('Local agregado correctamente:', response);
        // Limpiar el formulario después de agregar el local
        this.localForm.reset();
      },
      error => {
        console.error('Error al agregar local:', error);
      }
    );
  }
}
