# Repro for issue 7779

## Tests

Check the output of the two tests. Using `--only` to secure extensions are not started, the tests pass. Without `--only`, the tests fail.

That's a problem on it's own.

The next problem is that it's fails without a specific error about why. Adding `--debug` gives a indication about the problems related to the API calls, but... We're not expecting to see a isolated test to fail, just on basis of no API calls.

```js
➜  issues-7779 git:(main) ✗ npm run test_emulator_all                    

> 7624@1.0.0 test_emulator_all
> firebase emulators:exec 'npm run test_jest' --debug

[2024-10-11T12:24:02.229Z] > command requires scopes: ["email","openid","https://www.googleapis.com/auth/cloudplatformprojects.readonly","https://www.googleapis.com/auth/firebase","https://www.googleapis.com/auth/cloud-platform"]
Failed to authenticate, have you run firebase login?
⚠  emulators: You are not currently authenticated so some features may not work correctly. Please run firebase login to authenticate the CLI. 
[2024-10-11T12:24:02.384Z] java version "19.0.2" 2023-01-17

[2024-10-11T12:24:02.384Z] Java(TM) SE Runtime Environment (build 19.0.2+7-44)
Java HotSpot(TM) 64-Bit Server VM (build 19.0.2+7-44, mixed mode, sharing)

[2024-10-11T12:24:02.387Z] Parsed Java major version: 19
i  emulators: Starting emulators: auth, functions, firestore, hosting, pubsub, extensions {"metadata":{"emulator":{"name":"hub"},"message":"Starting emulators: auth, functions, firestore, hosting, pubsub, extensions"}}
[2024-10-11T12:24:02.388Z] No OAuth tokens found
[2024-10-11T12:24:02.388Z] No OAuth tokens found
[2024-10-11T12:24:02.389Z] > refreshing access token with scopes: []
[2024-10-11T12:24:02.390Z] >>> [apiv2][query] POST https://www.googleapis.com/oauth2/v3/token [none]
[2024-10-11T12:24:02.390Z] >>> [apiv2][body] POST https://www.googleapis.com/oauth2/v3/token [omitted]
[2024-10-11T12:24:02.470Z] <<< [apiv2][status] POST https://www.googleapis.com/oauth2/v3/token 400
[2024-10-11T12:24:02.471Z] <<< [apiv2][body] POST https://www.googleapis.com/oauth2/v3/token [omitted]
[2024-10-11T12:24:02.471Z] >>> [apiv2][query] GET https://firebase.googleapis.com/v1beta1/projects/projectname-default [none]
[2024-10-11T12:24:02.530Z] <<< [apiv2][status] GET https://firebase.googleapis.com/v1beta1/projects/projectname-default 401
[2024-10-11T12:24:02.531Z] <<< [apiv2][body] GET https://firebase.googleapis.com/v1beta1/projects/projectname-default {"error":{"code":401,"message":"Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.","status":"UNAUTHENTICATED","details":[{"@type":"type.googleapis.com/google.rpc.ErrorInfo","reason":"CREDENTIALS_MISSING","domain":"googleapis.com","metadata":{"service":"firebase.googleapis.com","method":"google.firebase.service.v1beta1.FirebaseProjectService.GetFirebaseProject"}}]}}
[2024-10-11T12:24:02.531Z] Got a 401 Unauthenticated error for a call that required authentication. Refreshing tokens.
[2024-10-11T12:24:02.531Z] No OAuth tokens found
[2024-10-11T12:24:02.531Z] No OAuth tokens found
[2024-10-11T12:24:02.531Z] > refreshing access token with scopes: []
[2024-10-11T12:24:02.532Z] >>> [apiv2][query] POST https://www.googleapis.com/oauth2/v3/token [none]
[2024-10-11T12:24:02.532Z] >>> [apiv2][body] POST https://www.googleapis.com/oauth2/v3/token [omitted]
[2024-10-11T12:24:02.582Z] <<< [apiv2][status] POST https://www.googleapis.com/oauth2/v3/token 400
[2024-10-11T12:24:02.582Z] <<< [apiv2][body] POST https://www.googleapis.com/oauth2/v3/token [omitted]
[2024-10-11T12:24:02.583Z] HTTP Error: 401, Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.
[2024-10-11T12:24:02.585Z] Could not find VSCode notification endpoint: FetchError: request to http://localhost:40001/vscode/notify failed, reason: connect ECONNREFUSED ::1:40001. If you are not running the Firebase Data Connect VSCode extension, this is expected and not an issue.
i  emulators: Shutting down emulators. {"metadata":{"emulator":{"name":"hub"},"message":"Shutting down emulators."}}
[2024-10-11T12:24:02.586Z] Could not find VSCode notification endpoint: FetchError: request to http://localhost:40001/vscode/notify failed, reason: connect ECONNREFUSED ::1:40001. If you are not running the Firebase Data Connect VSCode extension, this is expected and not an issue.
```

## Versions

firebase-tools: v13.22.0<br>
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

I had 13.19.0 on system, where everything worked just fine.

It's broken on 13.22.0, if extensions are not excluded, by specifying the `--only` flag.
