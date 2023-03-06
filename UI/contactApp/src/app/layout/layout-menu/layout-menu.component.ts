import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-layout-menu',
    templateUrl: './layout-menu.component.html'
})
export class LayoutMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'All Contact', icon: 'pi pi-fw pi-home', routerLink: ['/contacts'] },
                    { label: 'Archived Contact', icon: 'pi pi-fw pi-home', routerLink: ['/contacts/archive'] }
                ]
            }
        ];
    }
}
