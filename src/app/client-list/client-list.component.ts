import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ApiService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {

  clients: Client[] = [
    
  ];

  constructor(private router: Router, private service: ApiService,private snackBar: MatSnackBar) { }

  ngOnInit(): void { 
    this.service.getClientList().subscribe(
      (data: Client[]) => {
        console.log("dados", data);
        this.clients = data; 
      },
      (error) => {
        console.error('Ocorreu um erro ao obter a lista de clientes:', error);
      }
    );
    
  }

  addClient(): void {
    this.router.navigate(['/new-client']);
  }

  viewClient(account: number): void {
    this.router.navigate(['/client', account]);
  }

  editClient(account: number): void {
    this.router.navigate(['/edit-client', account]);
  }


}
