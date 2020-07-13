import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Autor } from 'src/app/models/autor.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  autor : Autor;

  constructor(
    private autorService: AutorService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController 

  ) { 

    this.autor = { nome:'',dataNascimento: new Date,nacionalidade:'',imagem:'',observacao:null};

  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id) {
      // Carregar as informações
      
      this.autorService.getAutor(id).subscribe((autor) => {
        this.autor = autor;
      });
    } 
  }

  async salvar() {

    this.autorService
      .salvar(this.autor)
      .subscribe(() => {
        this.navController.navigateForward(['/autor']);
      });
  }

}
