import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocacaoPageRoutingModule } from './locacao-routing.module';

import { LocacaoPage } from './locacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocacaoPageRoutingModule
  ],
  declarations: [LocacaoPage]
})
export class LocacaoPageModule {}
