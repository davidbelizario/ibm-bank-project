export interface Client {
    account: number;
    name: string;
    age: number;
    address: string;
    email: string;
    balance: number;
  }

  export interface RequestClient{
    name: string;
    age: number;
    address: string;
    email: string;
  }

  export interface Transaction{
    id: number;
    payer: number;
    payee: number;
    value: number;
    createdAt: Date;
  }

  export interface RequestTransaction{
    payer: number;
    payee: number;
    value: number;
  }


  