import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit, AfterViewInit {

  generosPoesia: any[] = []; 
  carreras: any[] = []; 
  fechaDeclamacion: string = '';
  edadEstudiante: number = 0;
  carreraEstudiante: number = 0;
  generoPoesia: number = 0;


  constructor(private apiService: ApiService) {}

 

  ngOnInit(): void {

    this.apiService.getGenerosPoesia().subscribe(data => {
      this.generosPoesia = data;
    });

    this.apiService.getCarreras().subscribe(data => {
      this.carreras = data;
    });


      


  }

  ngAfterViewInit (): void {

    setTimeout(() => {

      const tablaEstudiantes = $('#tablaEstudiantes').DataTable({
        columns: [
          { data: 'nombre_estudiante' },
          { data: 'edad_estudiante' },
          { data: 'nombre_carrera' },
          { data: 'nombre_genero_poesia' },
          { data: 'fecha_declamacion' }
        ],
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        }
      });
  
  
  
      this.cargarDatos();

    }, 100);
    

  }

  cargarDatos() {

    const formData = {
      fecha_declamacion: this.fechaDeclamacion,
      edad: this.edadEstudiante,
      carrera: this.carreraEstudiante,
      id_genero_poesia: this.generoPoesia
    };

    this.apiService.cargarDatos(formData).subscribe(data => {
      const tablaEstudiantes = $('#tablaEstudiantes').DataTable();
      tablaEstudiantes.clear().draw();
      tablaEstudiantes.rows.add(data).draw();
    });
  }

  exportexcel(): void
  {
    const dataTable = $('#tablaEstudiantes').DataTable();

  const data = dataTable.rows().data();

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.toArray());

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

  XLSX.writeFile(wb, 'reporte.xlsx');
 
  }

  exportToPDF(): void {
    const doc = new jsPDF()

    const dataTable = $('#tablaEstudiantes').DataTable();
    const data = dataTable.rows().data().toArray();

    let array = [];
        for(let key in data){
          let tempArray = []
          tempArray.push(data[key].nombre_estudiante);
          tempArray.push(data[key].edad_estudiante);
          tempArray.push(data[key].nombre_carrera);
          tempArray.push(data[key].nombre_genero_poesia);
          tempArray.push(data[key].fecha_declamacion);
          array.push(tempArray);
        } 
    
    const columns = ['Nombre Estudiante', 'Edad', 'Carrera', 'Género Poesía', 'Fecha Declamación'];
    
    autoTable(doc, {
      head: [columns],
      body: array,
    })

    doc.save('reporte.pdf')

    
  }

}