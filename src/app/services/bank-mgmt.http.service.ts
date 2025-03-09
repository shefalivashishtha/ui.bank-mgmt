import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApplicationStatus, ILoanApplication, IUser, IUserAccount } from "../models/response.interface";
import { ILoanApplicationRequest, ITransferRequest } from "../models/request.interface";

@Injectable()
export class BankMgmtHttpService{
    constructor(private readonly _client:HttpClient){}
    rootUrl:string = 'https://localhost:7221/';

    public getUserWithAllAccounts(username: string):Observable<IUser>{
        const url = `${this.rootUrl}user-profile?userName=${username}`;
        return this._client.get<IUser>(url);
    }
    public getUserAccount(userId: string, accountNumber: number):Observable<IUserAccount>{
        const url = `${this.rootUrl}account?userId=${userId}&accountNumber=${accountNumber}`;
        return this._client.get<IUserAccount>(url);
    }
    public transferMoney(request: ITransferRequest):Observable<boolean>{
        const url = `${this.rootUrl}transfer`;
        return this._client.post<boolean>(url,request);
    }

    public requestNewLoan(request: ILoanApplicationRequest):Observable<ILoanApplication>{
        const url = `${this.rootUrl}loan`;
        return this._client.post<ILoanApplication>(url,request);
    }
    public getApplicationStatus(userId: string, accountNumber: number):Observable<ApplicationStatus>{
        const url = `${this.rootUrl}application-status?userId=${userId}&applicationId=${accountNumber}`;
        return this._client.get<ApplicationStatus>(url);
    }
    public getAllApplications(userId:string):Observable<ILoanApplication[]>{
        const url = `${this.rootUrl}getAll?userId=${userId}`;
        return this._client.get<ILoanApplication[]>(url);
    }


}