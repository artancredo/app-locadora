import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/filme.interface';
import { FilmeService } from 'src/app/services/filme.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { AutorPage } from 'src/app/autor/autor.page';
import { Autor } from 'src/app/models/autor.interface';
import { AutorService } from 'src/app/services/autor.service';
import { Genero } from 'src/app/models/genero.interface';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  filme : Filme;

  autores : Autor[];
  autor : Autor;
  
  generos : Genero[];
  genero : Genero;
  

  constructor(
    private autorService: AutorService,
    private generoService: GeneroService,
    private filmeService: FilmeService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController:LoadingController

  ) { 
    this.autor = undefined;
    this.genero = undefined;
    this.listarAutores();
    this.filme = { nome:'',dataLancamento: new Date,sinopse:null,imagem:'',autor: { nome:'',dataNascimento: new Date,nacionalidade:'',imagem:'',observacao:null},genero:{ descricao:'' }};

  }

  getListaAutores() {
    return this.autores;
  }

  getListaGeneros() {
    return this.generos;
  }

  async listarAutores() {
    const busyLoader = await this.loadingController.create({message:'Carregando..'});
    busyLoader.present();
    this.autores = await this.autorService.getAutores().toPromise();
    this.generos = await this.generoService.getGeneros().toPromise();
    busyLoader.dismiss();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      // Carregar as informações
      
      this.filmeService.getFilme(id).subscribe((filme) => {
        this.filme = filme;
        this.autor = this.autores.find(item => item.id == filme.autor.id);
        this.genero = this.generos.find(item => item.id == filme.genero.id);
      });
    } 
  }

  async salvar() {

    this.filmeService
      .salvar(this.filme)
      .subscribe(() => {
        this.navController.navigateForward(['/filme']);
      });
  }

}
