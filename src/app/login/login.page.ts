import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  nombre: string = 'Javiera Banda'
  intereses: string[] = ['Progrmacion','Diseño','Compras']
  correo: string = 'ejemplo@gmail.com'



  constructor() { }

  ngOnInit() {
  }

}
