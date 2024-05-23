import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../app.service';
import { RequestTransaction } from '../../models/client.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  transactionForm: FormGroup;

  accountNumber: number = 0;

  transactionRequest: RequestTransaction = {
    payee:0,
    payer:0,
    value:0
  }

  constructor(private router: Router, private route: ActivatedRoute, private service: ApiService,
    private snackBar: MatSnackBar, private fb: FormBuilder
  ) { 
    this.transactionForm = this.fb.group({
      payee: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
    });
  }


  ngOnInit(): void { 

    this.route.params.subscribe(params => {
      const clientAccountParam = params['account'];
  
      if (clientAccountParam) {
          this.accountNumber = parseInt(clientAccountParam, 10);
        }
    });

  }

  goBack(): void {
    this.router.navigate(['/client', this.accountNumber]);
  }

  onSubmit(): void {
    if (this.transactionForm.valid){
      this.transactionRequest.payer = this.accountNumber;
      this.transactionRequest.payee = this.transactionForm.get('payee')?.value;
      this.transactionRequest.value = this.transactionForm.get('value')?.value;
      console.log(this.transactionRequest);
      this.service.postTransaction(this.transactionRequest).subscribe({
        next: () => {
          this.snackBar.open('Transferência realizada com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/client', this.accountNumber]);
        },
        error: (errorMessage) => {
          this.snackBar.open(`${errorMessage}`, 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

}
