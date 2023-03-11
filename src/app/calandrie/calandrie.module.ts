import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalandriePageRoutingModule } from './calandrie-routing.module';

import { CalandriePage } from './calandrie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalandriePageRoutingModule
  ],
  declarations: [CalandriePage]
})
export class CalandriePageModule {}
