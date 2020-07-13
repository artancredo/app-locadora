import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../models/autor.interface';
import { BASE_API } from './constantes';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  //private URI = 'http://localhost:3000/autor';  
  private URI = BASE_API + "/autor";

  constructor(
    private httpClient:HttpClient
  ) { }

  getAutores(){
    return this.httpClient.get<Autor[]>(this.URI);
  }
  adicionar(autor: Autor) {
    return this.httpClient.post<Autor>(this.URI, autor);
  }
  atualizar(autor: Autor) {
    return this.httpClient.put<Autor>(`${this.URI}/${autor.id}`, autor);
  }

  getAutor(id: number){
    return this.httpClient.get<Autor>(`${this.URI}/${id}`);
  }
  excluir(autor: Autor) {
    return this.httpClient.delete(`${this.URI}/${autor.id}`);
  }

  salvar(autor: Autor) {
    if (autor && autor.id) {
      return this.atualizar(autor);
    } else {
      return this.adicionar(autor);
    }
  }
}
