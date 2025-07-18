import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  private msalService = inject(MsalService);
  private router = inject(Router);

  async ngOnInit() {
    const instance = this.msalService.instance as PublicClientApplication;

    await instance.initialize();

    // ⛔ Must await this to avoid "interaction_in_progress" error
    const result = await instance.handleRedirectPromise();

    if (result && result.account) {
      instance.setActiveAccount(result.account);
      this.router.navigate(['/dashboard']);
      return;
    }

    // Already logged in
    const account = instance.getActiveAccount() || instance.getAllAccounts()[0];
    if (account) {
      instance.setActiveAccount(account);
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.msalService.loginRedirect();
  }

}
