import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  // private msalService = inject(MsalService);
  // private router = inject(Router);
  // username = '';

  // ngOnInit() {
  //   const account = this.msalService.instance.getActiveAccount();
  //   if (account) {
  //     this.username = account.username;
  //   } else {
  //     const accounts = this.msalService.instance.getAllAccounts();
  //     if (accounts.length > 0) {
  //       this.msalService.instance.setActiveAccount(accounts[0]);
  //       this.username = accounts[0].username;
  //     } else {
  //       this.router.navigate(['/']); // if no session, redirect to login
  //     }
  //   }
  // }

  // logout() {
  //   this.msalService.logoutRedirect({ postLogoutRedirectUri: '/' });
  // }

  private msalService = inject(MsalService);
  private router = inject(Router);
  username = '';
  instance!: PublicClientApplication;

  async ngOnInit() {
    this.instance = this.msalService.instance as PublicClientApplication;
    await this.instance.initialize();

    const account = this.instance.getActiveAccount() || this.instance.getAllAccounts()[0];
    if (!account) {
      this.router.navigate(['/']);
      return;
    }

    this.instance.setActiveAccount(account);
    this.username = account.username;
  }

  async logout() {
    debugger;
    await this.instance.initialize(); // ✅ Again, safe recheck
    this.msalService.logoutRedirect({ postLogoutRedirectUri: '/' });
  }
}
