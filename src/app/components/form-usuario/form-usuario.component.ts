import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { switchMap } from 'rxjs/operators';
import { MensajeDialogComponent } from '../mensaje-dialog/mensaje-dialog.component';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';

import { from } from 'rxjs';
import { forkJoin } from 'rxjs';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent implements OnInit, AfterViewInit {
  dialogRef: MatDialogRef<any> | undefined; 

  generos: any[] = [];
  carnet: string = '';
  nombreEstudiante: string = '';
  direccion: string = '';
  genero: number = 0;
  telefono: string = '';
  fecha_nacimiento: string = '';
  carrera: string = '';
  generosPoesia: any[] = [];
  generoPoesia: number = 0;

  edadValida: boolean | undefined;
  todosLosCamposLlenos: boolean = false;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.apiService.getGeneros().subscribe((data) => {
      this.generos = data;
    });

    this.apiService.getGenerosPoesia().subscribe((data) => {
      this.generosPoesia = data;
    });
  }

  ngAfterViewInit(): void {}

  validarEdad() {
    const fechaNacimiento = new Date(this.fecha_nacimiento);
    const fechaActual = new Date();

    var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    if (
      fechaActual.getMonth() < fechaNacimiento.getMonth() ||
      (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
        fechaActual.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }

    this.edadValida = edad >= 18;
  }
  verificarCamposLlenos() {
    this.todosLosCamposLlenos = !(
      !this.carnet ||
      !this.nombreEstudiante ||
      !this.direccion ||
      !this.genero ||
      !this.telefono ||
      !this.fecha_nacimiento ||
      !this.carrera ||
      !this.generoPoesia
    );
  }
  
  
  inscribirEstudiante() {
    const formData = {
      carnet: this.carnet,
      nombre_estudiante: this.nombreEstudiante,
      direccion: this.direccion,
      id_genero: this.genero,
      telefono: this.telefono,
      fecha_nacimiento: this.fecha_nacimiento,
      nombre_carrera: this.carrera,
    };
  
    this.apiService.inscirbirEstudiante(formData)
      .pipe(
        switchMap((data) => {

          var respuesta = data[0]; 
          var idEstudianteRespuesta = respuesta.id_estudiante;
          var carnetRespuesta = respuesta.carnet;
  

          const formData2 = {
            id_estudiante: idEstudianteRespuesta,
            id_genero_poesia: this.generoPoesia,
            carnet: carnetRespuesta,
          };
          

          return this.apiService.asignarCompetencia(formData2);
        })
      )
      .subscribe((data) => {
        const mensaje = `Fecha de inscripción: ${data[0].fecha_inscripcion}`;
        this.mostrarDialogo(mensaje);
      });
  }

  mostrarDialogo(mensaje: string) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '250px',
      data: { mensaje: mensaje },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado');
    });
  }

  cerrarDialogo() {
    if (this.dialogRef) {
      this.dialogRef.close(); 
    }
  }

}
