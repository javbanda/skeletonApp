import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'] || 'Invitado';
    });
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = '';
  }

  async mostrar() {
    const alert = await this.alertCtrl.create({
      header: 'Información Ingresada',
      message: `
        Nombre: ${this.nombre} ${this.apellido} 
        Nivel Educación: ${this.nivelEducacion} 
        Fecha Nacimiento: ${this.formatearFecha(this.fechaNacimiento)} 
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  formatearFecha(fechaISO: string): string {
    if (!fechaISO) return '';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  async guardarYCerrar() {
    const alert = await this.alertCtrl.create({
      header: 'Fecha guardada',
      message: `Fecha seleccionada: <strong>${this.formatearFecha(this.fechaNacimiento)}</strong>`,
      buttons: ['OK']
    });
    await alert.present();

    
    const modal: HTMLIonModalElement | null = document.querySelector('ion-modal');
    if (modal) {
      await modal.dismiss();
    }
  }
}
