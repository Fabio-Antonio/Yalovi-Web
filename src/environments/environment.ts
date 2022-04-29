// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAVN1hQEbHnMWxsXjbQ44MpM1MjjL6fKmQ",
    authDomain: "contacto-7947a.firebaseapp.com",
    databaseURL: "https://contacto-7947a.firebaseio.com",
    projectId: "contacto-7947a",
    storageBucket: "contacto-7947a.appspot.com",
    messagingSenderId: "223995574229",
    appId: "1:223995574229:web:320b677b9f52ded2602f5c",
    measurementId: "G-WWNN8THLHZ"
  },
  //base_url:'https://backend-server-4ixr0kmf2-fabio-antonio.vercel.app/api'
  base_url:'http://192.168.0.179:3000/api'
};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
