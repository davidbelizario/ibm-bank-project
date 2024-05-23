import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, Transaction } from '../../models/client.model';
import { ApiService } from '../app.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  client: Client;

  transactions: Transaction[];

  clientAccountParam: number = 0;

  showBalance: boolean = true; 

  dataLoaded: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private service: ApiService) {
    this.client = {
      account: 0,
      name: '',
      age: 0,
      address: '',
      email: '',
      balance: 0
    };

    this.transactions = [];

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const clientAccountParam = params['account'];
      if (clientAccountParam) {
          const accountNumber = parseInt(clientAccountParam, 10);
          this.fetchClientData(accountNumber);
          this.fetchTransactions(accountNumber);
        }
    });

  }


  fetchClientData(accountNumber: number) {
    this.service.getClientByAccountNumber(accountNumber).subscribe(
      (data: Client) => {
        this.client = data;
      },
      (error) => {
        console.error('Ocorreu um erro ao obter o cliente:', error);
      }
    );
  }

  fetchTransactions(accountNumber: number) {
    this.service.getTransactionsByAccountNumber(accountNumber).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
      }
    );
  }
  


  goBack(): void {
    this.router.navigate(['/clients']);
  }

  transfer(): void {
    this.router.navigate(['/transfer', this.client?.account]);
  }

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance; 
  }

  positiveOrNegativeValue(value: number): string {
    return value >= 0 ? 'positive-value' : 'negative-value';
  }


}
