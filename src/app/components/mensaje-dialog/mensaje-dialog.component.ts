import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-dialog',
  templateUrl: './mensaje-dialog.component.html',
  styleUrls: ['./mensaje-dialog.component.css']
})
export class MensajeDialogComponent {
  mensaje: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string },
    public dialogRef: MatDialogRef<MensajeDialogComponent>
  ) {
    this.mensaje = data.mensaje;
  }

  cerrarDialogo() {
    // Cierra el diálogo modal
    this.dialogRef.close();
  }
}