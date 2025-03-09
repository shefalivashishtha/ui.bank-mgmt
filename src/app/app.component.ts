import { Component } from '@angular/core';
import { map, Observable, subscribeOn } from 'rxjs';
import { ILoanApplication, IUser, IUserAccount } from './models/response.interface';
import { ILoanApplicationRequest } from './models/request.interface';
import { BankMgmtHttpService } from './services/bank-mgmt.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private readonly _service:BankMgmtHttpService){}
  title = 'ui.bank-management';
  showLogin: boolean = true;
  showAccounts: boolean = false;
  showApplications: boolean = false;
  showNewLoanRequest: boolean = false;
  inUserName: string = '';
  inLoanDuration: number = 0;
  inLoanAmount: number = 0;
  loanApplication!:ILoanApplication;
  loanApplications!:ILoanApplication[];
  
  public userId:string='';

   public userAccounts!:IUserAccount[];

  onLoginClick(){
    this._service.getUserWithAllAccounts(this.inUserName).subscribe((response:IUser) => {
      this.userId = response.id;
      this.userAccounts = response.accounts;
    });
    
    this.showLogin = false;
    this.showAccounts = true;
  }
  onRequestNewLoanClick(){
    this.showNewLoanRequest = true;
    this.showAccounts = false;
    this.showLogin = false;
  }

  onSubmit(inLoanDuration: number,inLoanAmount: number){
    const request:ILoanApplicationRequest={
      Duration: inLoanDuration,
      LoanAmount: inLoanAmount,
      UserId:this.userId 
    };
    this._service.requestNewLoan(request).subscribe(response => this.loanApplication = response);
    this._service.getUserWithAllAccounts(this.inUserName).subscribe((response:IUser) => {
      this.userId = response.id;
      this.userAccounts = response.accounts;
    });
    this.showAccounts = true;
    this.showNewLoanRequest = false;
  }

  onViewAllLoanApplicationsClick(){
    this._service.getAllApplications(this.userId).subscribe(response => this.loanApplications = response);
    this.showApplications = true;
    this.showAccounts = false;
    
  }

  onHomeClick(){
    this.showAccounts = true;
    this.showApplications = false;
  }


  onLogOutClick(){
    this.showAccounts = false;
    this.showApplications = false;
    this.showLogin = true;
  }
}
