import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MSAL_INSTANCE, MSAL_GUARD_CONFIG, MsalService, MsalBroadcastService, MsalGuard, MsalGuardConfiguration } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';


export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: 'b41db85c-89d4-46da-bb11-c78a5905fbd6',
      authority: 'https://login.microsoftonline.com/4c599255-05d9-4772-8738-ad558fc18893',
      redirectUri: 'http://localhost:4200/', // or your app's redirect URI
      //client secret 13693ea7-64b5-4fc1-aa20-4358e21d5162
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard,
  ]
};
