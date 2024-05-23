import { Component } from '@angular/core';
import { Client, RequestClient } from '../../models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent {

  newClientForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private service: ApiService,
    private snackBar: MatSnackBar, private fb: FormBuilder
  ) { 
    this.newClientForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(12)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }

  onSubmit(): void {
    if (this.newClientForm.valid){
      const newClient: RequestClient = this.newClientForm.value;
      this.service.createClient(newClient).subscribe(
        (response) => {
          this.snackBar.open('Cliente Cadastrado com Sucesso!', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });        
          setTimeout(() => {
            this.router.navigate(['/clients']);
          }, 1500);
        },
        (error) => {
          this.snackBar.open('Erro ao cadastrar novo cliente!', 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      );
    }
  }

}
