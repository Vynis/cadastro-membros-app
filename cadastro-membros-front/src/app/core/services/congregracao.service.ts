import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloBase } from '../models/modelo-base';



@Injectable({
    providedIn: 'root'
  })
export class CongregacaoService {
    caminhoApi: string = '';

    constructor(private http: HttpClient) {
        this.caminhoApi = environment.api;
    }

    buscarTodasCongregacoes(): Observable<ModeloBase> {
        return this.http.get<ModeloBase>(`${this.caminhoApi}congregacao/buscar-todos-ativos`);
    }

}
