import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, MenuController, createAnimation } from '@ionic/angular';

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

  @ViewChild('tituloAnimado', { read: ElementRef }) tituloAnimado!: ElementRef;
  @ViewChild('bienvenidaAnimada', { read: ElementRef }) bienvenidaAnimada!: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private menu: MenuController
  ) {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'] || 'Invitado';
    });

    this.menu.enable(true); // Activa el menú para esta vista
  }

  ionViewDidEnter() {
    const animation = createAnimation()
      .addElement(this.tituloAnimado.nativeElement)
      .duration(1000)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(-20px)', 'translateY(0px)');

    const bienvenida = createAnimation()
    .addElement(this.bienvenidaAnimada.nativeElement)
    .duration(1000)
    .delay(300) // espera un poco para que entre después del título
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateY(-20px)', 'translateY(0px)');
    
    bienvenida.play();
    animation.play();
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
        Nombre: ${this.nombre} ${this.apellido}<br>
        Nivel Educación: ${this.nivelEducacion}<br>
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
