// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Client, RequestClient, RequestTransaction, Transaction } from '../models/client.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrlBase = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createClient(request: RequestClient): Observable<Client> {
    const requestBody = JSON.stringify(request);

    return this.http.post<Client>(`${this.apiUrlBase}/user`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getClientList(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrlBase}/user`);
  }

  getClientByAccountNumber(accountNumber: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrlBase}/user/${accountNumber}`);
  }

  getTransactionsByAccountNumber(accountNumber: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrlBase}/transaction/${accountNumber}`);
  }

  postTransaction(request: RequestTransaction): Observable<RequestTransaction> {
    return this.http.post<RequestTransaction>(`${this.apiUrlBase}/transaction`, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(accountNumber: number, request: RequestClient): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrlBase}/user/${accountNumber}`, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
