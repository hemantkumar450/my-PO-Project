import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list.component';
import { routing } from './cart-list.routing';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { CartService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    routing,
    CoreModule,
    SharedModule
  ],
  declarations: [CartListComponent],
  providers: [CartService]
})

export class CartListModule { }
