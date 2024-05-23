import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { TransferComponent } from './transfer/transfer.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NewClientComponent } from './new-client/new-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar o FormsModule
import { HttpClientModule } from '@angular/common/http'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditClientComponent } from './edit-client/edit-client.component';






@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailComponent,
    TransferComponent,
    NewClientComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule, 
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],

  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
