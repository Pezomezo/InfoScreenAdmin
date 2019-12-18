// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndPoint: '',
  powerBIEndpoint: 'https://analysis.windows.net/powerbi/api',
  groupId: '',
  adalConfig: {
    tenant: '097464b8-069c-453e-9254-c17ec707310d',
    ClientId: '37213841-4716-4b21-9197-ea0a38448187',
    cacheLocation: 'localStorage',
    redirectUri: `${window.location.origin}`,
    popUp: false
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
