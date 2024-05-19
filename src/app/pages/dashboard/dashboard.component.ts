import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Locales } from '../../model/Locales';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  localForm!: FormGroup;
  local: Locales | undefined;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.localForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      logo: ['', Validators.required],
      categoria: ['', Validators.required]
    });
    this.getLocalDetails();
  }

  // Método para agregar un local
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

  //Metodo para cerrar sesion
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
