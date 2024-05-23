import { Component } from '@angular/core';
import { Client, RequestClient } from '../../models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent {

  editClientForm: FormGroup;

  client: Client = {
    account: 0,
    name: '',
    age: 0,
    email:'',
    address: '',
    balance: 0
  }; 
  accountNumber: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private service: ApiService,
    private snackBar: MatSnackBar,  private fb: FormBuilder
  ) {

    this.editClientForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(12)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    }

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      const clientAccountParam = params['account'];
      if (clientAccountParam) {
          this.accountNumber = parseInt(clientAccountParam, 10);
          this.fetchClientData(this.accountNumber);
        }
    });
  }

  fetchClientData(accountNumber: number) {
    this.service.getClientByAccountNumber(accountNumber).subscribe(
      (data: Client) => {
        this.client = data;
        this.editClientForm.patchValue({
          name: data.name,
          age: data.age,
          address: data.address,
          email: data.email
        });
      },
      (error) => {
        console.error('Ocorreu um erro ao obter o cliente:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }

  onSubmit(): void {
    if (this.editClientForm.valid){
      const editedClient: RequestClient = this.editClientForm.value;
      this.service.updateUser(this.accountNumber, editedClient).subscribe(
        (response) => {
          this.snackBar.open('Cliente Editado com Sucesso!', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });        
          setTimeout(() => {
            this.router.navigate(['/clients']);
          }, 1500);
        },
        (error) => {
          this.snackBar.open('Erro ao editar cliente!', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
          }
        )
      }
  }
}
