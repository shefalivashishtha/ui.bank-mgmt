export interface IUser{
    name:string;
    id: string;
    creditRating: number;
    isActive: boolean;
    createdDate: Date;
    accounts:IUserAccount[];
}

export interface IUserAccount{
    user:IUser|null,
    accountNumber:number;
    balance:number;
    accountType:AccountType;
    createdDate: Date;
}

export interface ILoanApplication{
    applicationId: number;
	loanDuration : number;
		loanAmount: number;
		user : IUser|null;
		applicationStatus : ApplicationStatus;
        loanAccountNumber: number;
        interestRate: number;
}

export enum ApplicationStatus{
    Approved,
    Rejected
}

export enum AccountType{
Current,
Savings,
Loan

}