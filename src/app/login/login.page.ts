import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  async login() {
    const userRegex = /^[a-zA-Z0-9]{3,8}$/;
    const passRegex = /^\d{3,8}$/;

    if (!userRegex.test(this.usuario)) {
      this.presentAlert('Usuario inválido. Debe tener entre 3 y 8 caracteres alfanuméricos.');
      return;
    }

    if (!passRegex.test(this.contrasena)) {
      this.presentAlert('Contraseña inválida. Debe contener entre 3 y 8 dígitos.');
      return;
    }
 
    
    this.router.navigate(['/home'], {
      queryParams: { usuario: this.usuario },
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
