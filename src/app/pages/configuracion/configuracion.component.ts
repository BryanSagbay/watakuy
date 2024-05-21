import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { Propietarios } from '../../model/Propietarios';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent  {

}
