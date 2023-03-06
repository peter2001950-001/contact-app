import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponents, LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LayoutTopbarComponent } from './layout-topbar/layout-topbar.component';
import { LayoutMenuComponent } from './layout-menu/layout-menu.component';
import { LayoutMenuitemComponent } from './layout-menu/layout-manuitem.component';
import { LayoutSidebarComponent } from './layout-sidebar/layout-sidebar.component';


@NgModule({
  declarations: [
    LayoutComponents.components,
    LayoutTopbarComponent,
    LayoutMenuComponent,
    LayoutMenuitemComponent,
    LayoutSidebarComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ToastModule
  ],
  providers:[MessageService]
})
export class LayoutModule { }
