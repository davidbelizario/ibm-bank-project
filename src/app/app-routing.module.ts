import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { TransferComponent } from './transfer/transfer.component';
import { NewClientComponent } from './new-client/new-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientListComponent },
  { path: 'client/:account', component: ClientDetailComponent },
  { path: 'transfer/:account', component: TransferComponent }, 
  { path: 'new-client', component: NewClientComponent },
  { path: 'edit-client/:account', component: EditClientComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
