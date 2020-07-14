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
  autorSelecao : String;
  
  generos : Genero[];
  generoSelecao : String;
  

  constructor(
    private autorService: AutorService,
    private generoService: GeneroService,
    private filmeService: FilmeService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController:LoadingController

  ) { 
    this.autorSelecao = undefined;
    this.generoSelecao = undefined;
    this.listarAutores();
    this.filme = { nome:'',dataLancamento: new Date,sinopse:null,imagem:'',autor: { nome:'',dataNascimento: new Date,nacionalidade:'',imagem:'',observacao:null},genero:{ descricao:'' }, valor: 0};

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
        setTimeout(() => {
          this.autorSelecao = filme.autor.id;
          this.generoSelecao = filme.genero.id;
          }, 500);
      });
    } 
  }

  async salvar() {
    this.filme.autor = this.autores.find(item => item.id == this.autorSelecao);
    this.filme.genero = this.generos.find(item => item.id == this.generoSelecao);

    this.filmeService
      .salvar(this.filme)
      .subscribe(() => {
        this.navController.navigateForward(['/filme']);
      });
  }

}
