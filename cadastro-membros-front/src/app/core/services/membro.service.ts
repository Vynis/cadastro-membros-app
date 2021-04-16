import { ModeloBase } from './../models/modelo-base';
import { MembroModel } from './../models/membro.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  caminhoApi: string = '';

  constructor(private http: HttpClient) { 
    this.caminhoApi = environment.api;
  }

  salvar(membro: MembroModel) {
    return this.http.post<ModeloBase>(`${this.caminhoApi}membro/adcionar`,membro);
  }

}
