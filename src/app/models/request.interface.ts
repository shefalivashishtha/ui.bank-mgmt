export interface ILoanApplicationRequest{
    Duration:number;
    LoanAmount:number;
    UserId: string;
}

export interface ITransferRequest{
    SourceAccountNumber: number;
    DestinationAccountNumber: number;
    TransactionAmount: number;
    UserId: string;
}