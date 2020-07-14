import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { Locacao } from 'src/app/models/locacao.interface';
import { Filme } from 'src/app/models/filme.interface';
import { FilmeService } from 'src/app/services/filme.service';
import { LocacaoService } from 'src/app/services/locacao.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  locacao : Locacao;
  
  filmes : Filme[];
  filmeSelecao : String;

  clientes : Cliente[];
  clienteSelecao : String;

  constructor(
    private filmeService: FilmeService,
    private clienteService: ClienteService,
    private locacaoService: LocacaoService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController:LoadingController

  ) { 
    this.filmeSelecao = undefined;
    this.clienteSelecao = undefined;
    this.listar();
    this.locacao = { 
      cliente: { cpf: '', nome:'', idade: null },
      filme: { nome:'',dataLancamento: new Date,sinopse:null,imagem:'',autor: { nome:'',dataNascimento: new Date,nacionalidade:'',imagem:'',observacao:null},genero:{ descricao:'' }, valor: 0},
      dataInicio: new Date,
      dataFim: new Date,
      valor: 0
      };
  }

  getListaClientes() {
    return this.clientes;
  }

  getListaFilmes() {
    return this.filmes;
  }

  async listar() {
    const busyLoader = await this.loadingController.create({message:'Carregando..'});
    busyLoader.present();
    this.filmes = await this.filmeService.getFilmes().toPromise();
    this.clientes = await this.clienteService.getClientes().toPromise();
    busyLoader.dismiss();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      // Carregar as informações
      
      this.locacaoService.getLocacao(id).subscribe((locacao) => {
        this.locacao = locacao;
        
        setTimeout(() => {
          this.filmeSelecao = locacao.filme.id;
          this.clienteSelecao = locacao.cliente.id;
          }, 1000);
      });
    } 
  }

  async salvar() {

    this.locacao.filme = this.filmes.find(item => item.id == this.filmeSelecao);
    this.locacao.cliente = this.clientes.find(item => item.id == this.clienteSelecao);


    this.locacaoService
      .salvar(this.locacao)
      .subscribe(() => {
        this.navController.navigateForward(['/locacao']);
      });
  }
}
