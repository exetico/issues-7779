# Repro for issue 7779

## Versions

firebase-tools: v13.20.2<br>
platform: macOS

## Steps to reproduce

1. Install dependencies
   - Run `npm i`
   - Run `cd functions`
   - Run `npm i`
   - Run `cd ..`
2. Run `firebase emulators:exec --only auth,functions,firestore,hosting,pubsub 'npm run test'`
   - Outputs:

```
[2024-10-08T15:22:31.962Z] > command requires scopes: ["email","openid","https://www.googleapis.com/auth/cloudplatformprojects.readonly","https://www.googleapis.com/auth/firebase","https://www.googleapis.com/auth/cloud-platform"]
[2024-10-08T15:22:31.962Z] > authorizing via signed-in user (<USER_EMAIL>)
[2024-10-08T15:22:32.129Z] openjdk version "22.0.2" 2024-07-16

[2024-10-08T15:22:32.130Z] OpenJDK Runtime Environment Zulu22.32+15-CA (build 22.0.2+9)
OpenJDK 64-Bit Server VM Zulu22.32+15-CA (build 22.0.2+9, mixed mode, sharing)

[2024-10-08T15:22:32.136Z] Parsed Java major version: 22
i  emulators: Starting emulators: auth, functions, firestore, hosting, pubsub {"metadata":{"emulator":{"name":"hub"},"message":"Starting emulators: auth, functions, firestore, hosting, pubsub"}}
[2024-10-08T15:22:32.562Z] [logging] Logging Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.562Z] [auth] Authentication Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.562Z] [firestore] Firestore Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.562Z] [firestore.websocket] websocket server for firestore only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.562Z] [hosting] Hosting Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.562Z] [pubsub] Pub/Sub Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.563Z] assigned listening specs for emulators {"user":{"logging":[{"address":"127.0.0.1","family":"IPv4","port":4500}],"auth":[{"address":"127.0.0.1","family":"IPv4","port":9099}],"firestore":[{"address":"127.0.0.1","family":"IPv4","port":8080}],"firestore.websocket":[{"address":"127.0.0.1","family":"IPv4","port":9150}],"hosting":[{"address":"127.0.0.1","family":"IPv4","port":5000}],"pubsub":[{"address":"127.0.0.1","family":"IPv4","port":8085}]},"metadata":{"message":"assigned listening specs for emulators"}}
[2024-10-08T15:22:32.776Z] [functions] Functions Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.777Z] [eventarc] Eventarc Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.777Z] [tasks] Cloud Tasks Emulator only supports listening on one address (127.0.0.1). Not listening on ::1
[2024-10-08T15:22:32.777Z] late-assigned ports for functions and eventarc emulators {"user":{"logging":[{"address":"127.0.0.1","family":"IPv4","port":4500}],"auth":[{"address":"127.0.0.1","family":"IPv4","port":9099}],"firestore":[{"address":"127.0.0.1","family":"IPv4","port":8080}],"firestore.websocket":[{"address":"127.0.0.1","family":"IPv4","port":9150}],"hosting":[{"address":"127.0.0.1","family":"IPv4","port":5000}],"pubsub":[{"address":"127.0.0.1","family":"IPv4","port":8085}],"functions":[{"address":"127.0.0.1","family":"IPv4","port":5001}],"eventarc":[{"address":"127.0.0.1","family":"IPv4","port":9299}],"tasks":[{"address":"127.0.0.1","family":"IPv4","port":9499}]},"metadata":{"message":"late-assigned ports for functions and eventarc emulators"}}
[2024-10-08T15:22:32.781Z] Could not find VSCode notification endpoint: FetchError: request to http://localhost:40001/vscode/notify failed, reason:
i  emulators: Shutting down emulators. {"metadata":{"emulator":{"name":"hub"},"message":"Shutting down emulators."}}
[2024-10-08T15:22:32.782Z] Could not find VSCode notification endpoint: FetchError: request to http://localhost:40001/vscode/notify failed, reason:
```

## Notes

When using the firebase-tools `v13.20.2`, running `firebase emulators:exec --only auth,functions,firestore,hosting,pubsub 'npm run test'` outputs:

```
i  emulators: Starting emulators: auth, functions, firestore, hosting, pubsub
i  emulators: Shutting down emulators.
```

When using the firebase-tools `v13.21.0`, running `firebase emulators:exec --only auth,functions,firestore,hosting,pubsub 'npm run test'` outputs:

```
i  emulators: Starting emulators: auth, functions, firestore, hosting, pubsub
⚠  functions: The following emulators are not running, calls to these services from the Functions emulator will affect production: database, storage, dataconnect
⚠  functions: Unable to fetch project Admin SDK configuration, Admin SDK behavior in Cloud Functions emulator may be incorrect.
i  firestore: Firestore Emulator logging to firestore-debug.log
✔  firestore: Firestore Emulator UI websocket is running on 9150.
i  pubsub: Pub/Sub Emulator logging to pubsub-debug.log
⚠  hosting: Authentication error when trying to fetch your current web app configuration, have you run firebase login?
⚠  hosting: Could not fetch web app configuration and there is no cached configuration on this machine. Check your internet connection and make sure you are authenticated. To continue, you must call firebase.initializeApp({...}) in your code before using Firebase.
i  hosting[projectname-default]: Serving hosting files from: public
✔  hosting[projectname-default]: Local server: http://127.0.0.1:5000
i  functions: Watching "/Users/<PATH>/issues/7779/functions" for Cloud Functions...
⚠  functions: package.json indicates an outdated version of firebase-functions. Please upgrade using npm install --save firebase-functions@latest in your functions directory.
⚠  functions: Please note that there will be breaking changes when you upgrade.
⚠  functions: Your requested "node" version "18" doesn't match your global version "20". Using node@20 from host.
Serving at port 8313

✔  functions: Loaded functions definitions from source: .
i  Running script: npm run test

> 7624@1.0.0 test
> jest -- "__tests__/"


 PASS  __tests__/index.test.js
  ✓ should add 1 + 1 (1 ms)
  ✓ should get a response from hosting emulator (25 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.177 s, estimated 1 s
Ran all test suites matching /__tests__\//i.
✔  Script exited successfully (code 0)
i  emulators: Shutting down emulators.
i  functions: Stopping Functions Emulator
i  hosting: Stopping Hosting Emulator
i  firestore: Stopping Firestore Emulator
i  pubsub: Stopping Pub/Sub Emulator
i  auth: Stopping Authentication Emulator
i  eventarc: Stopping Eventarc Emulator
i  tasks: Stopping Cloud Tasks Emulator
i  hub: Stopping emulator hub
i  logging: Stopping Logging Emulator
```
