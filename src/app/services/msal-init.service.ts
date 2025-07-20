import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class MsalInitService {
  constructor(private msalService: MsalService) {}
  
  async ready(): Promise<PublicClientApplication> {
    const instance = this.msalService.instance as PublicClientApplication;
    await instance.initialize();
    return instance;
  }
}
