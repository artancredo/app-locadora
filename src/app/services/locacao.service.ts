import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locacao } from 'src/app/models/locacao.interface';
import { BASE_API } from './constantes';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {

  //private URI = 'http://localhost:3000/locacao';
  private URI = BASE_API + "/locacao";

  constructor(
    private httpClient:HttpClient
  ) { }

  getLocacaos(){
    return this.httpClient.get<Locacao[]>(this.URI);
  }

  adicionar(locacao: Locacao){
    return this.httpClient.post<Locacao>(this.URI, locacao);
  }
  atualizar(locacao:Locacao){
    return this.httpClient.put<Locacao>(`${this.URI}/${locacao.id}`, locacao);
  }
  getLocacao(id: number){
    return this.httpClient.get<Locacao>(`${this.URI}/${id}`);
  }
  excluir(locacao: Locacao){
    return this.httpClient.delete(`${this.URI}/${locacao.id}`);
  }

  salvar(locacao: Locacao) {
    if (locacao && locacao.id) {
      return this.atualizar(locacao);
    } else {
      return this.adicionar(locacao);
    }
  }

}
