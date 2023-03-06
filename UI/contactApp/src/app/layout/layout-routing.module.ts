import { ContactListModule } from './../pages/contacts/contact-list/contact-list.module';
import { LayoutModule } from './layout.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      redirectTo: '/contacts',
      pathMatch: 'full'
    },
    {
      path: 'contacts',
      loadChildren: () => import('../pages/contacts/contacts.module').then((m) => m.ContactsModule)
    },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

export class LayoutComponents {
  public static components = [
    LayoutComponent
  ];
}

