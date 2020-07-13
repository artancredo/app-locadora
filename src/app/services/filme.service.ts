import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filme } from 'src/app/models/filme.interface';
import { BASE_API } from './constantes';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  //private URI = 'http://localhost:3000/filme';
  private URI = BASE_API + "/filme";

  constructor(
    private httpClient:HttpClient
  ) { }

  getFilmes(){
    return this.httpClient.get<Filme[]>(this.URI);
  }

  adicionar(filme: Filme){
    return this.httpClient.post<Filme>(this.URI, filme);
  }
  atualizar(filme:Filme){
    return this.httpClient.put<Filme>(`${this.URI}/${filme.id}`, filme);
  }
  getFilme(id: number){
    return this.httpClient.get<Filme>(`${this.URI}/${id}`);
  }
  excluir(filme: Filme){
    return this.httpClient.delete(`${this.URI}/${filme.id}`);
  }

  salvar(filme: Filme) {
    if (filme && filme.id) {
      return this.atualizar(filme);
    } else {
      return this.adicionar(filme);
    }
  }

}
