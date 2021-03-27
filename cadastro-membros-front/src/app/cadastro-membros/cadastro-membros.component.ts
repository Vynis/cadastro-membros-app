import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-membros',
  templateUrl: './cadastro-membros.component.html',
  styleUrls: ['./cadastro-membros.component.scss']
})
export class CadastroMembrosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  buscar(event) {
    let datePipe = new DatePipe("pt-BR");
    let data = datePipe.transform(new Date(event.value), "dd/MM/yyyy");
  }

}
