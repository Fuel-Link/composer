import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: ' http://grupo1-egs-deti.ua.pt/keycloak',
        realm: 'Fuel-Link',
        clientId: 'api'
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}