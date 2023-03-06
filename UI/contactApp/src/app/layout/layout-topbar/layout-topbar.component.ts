import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrls: ['./layout-topbar.component.scss']
})
export class LayoutTopbarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) { }
}
