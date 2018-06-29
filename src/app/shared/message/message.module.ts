import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageSericeComponent } from '../message/messageService.component';
import { MessageService } from '../message/messageService.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule
  ],
  declarations: [
    MessageSericeComponent
  ],
  providers: [MessageService],
  exports: [
    MessageSericeComponent,

  ]
})

export class MessageModule { }
