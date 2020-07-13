import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Cliente } from '../models/cliente.interface';
import { ClienteService} from '../services/cliente.service';
import { Filme } from 'src/app/models/filme.interface';
import { FilmeService } from 'src/app/services/filme.service';
import { Locacao } from '../models/locacao.interface';
import { LocacaoService } from '../services/locacao.service';
import { AlertController} from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  clientes : Cliente[];
  filmes: Filme[];
  locacoes: Locacao[];
  total : number;

  constructor(
    private ClienteService: ClienteService,
    private filmeService: FilmeService,
    private locacaoService: LocacaoService,
    private alertController: AlertController
  ) {
  }
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async detalhesCli(){
    let nome : string = '';
    this.clientes.forEach(element => {
      nome += element.nome+'<br>'
    })

    const alerta = await this.alertController.create({
      header: 'Lista de clientes',
      subHeader: '',
      message: `${nome}`,
      buttons: ['Sair']
    });
    alerta.present();
  }

  async detalhesFil(){
    let nome : string = '';
    this.filmes.forEach(element => {
      nome += element.nome+'<br>'
    })

    const alerta = await this.alertController.create({
      header: 'Lista de Filmes',
      subHeader: '',
      message: `${nome}`,
      buttons: ['Sair']
    });
    alerta.present();
  }

  async detalhesVar(){
    let nome : string = '';
    this.locacoes.forEach(element => {
      nome += element.cliente.nome+' - '+'R$:'+element.valor+'<br>'
    })

    const alerta = await this.alertController.create({
      header: 'Detalhes Locações',
      subHeader: 'Cliente - Valor',
      message: `${nome}`,
      buttons: ['Sair']
    });
    alerta.present();
  }

  async listar(){
      this.clientes = await this.ClienteService.getClientes().toPromise();
      this.filmes = await this.filmeService.getFilmes().toPromise();
      this.locacoes = await this.locacaoService.getLocacaos().toPromise();
      
      this.total = 0;
      this.locacoes.forEach(element => {
        this.total = this.total + element.valor;
      });

  }

}
