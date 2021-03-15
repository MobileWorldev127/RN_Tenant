# Tenancy Tracker

## Yarn

If you don't have `Yarn`, [install it](yarnpkg.com/en/docs/install).

Before all else, after you've pulled, run `yarn clean`,

To run on iOS Simulator, run: `yarn ios`

To run on Android, run: `yarn android` then if needed, `adb reverse tcp:8081 tcp:8081`

To just start the packager, run: `yarn start`

If you get a weird resolve error, something with `./node_modules/react-native/src/api/auth`, then try running `yarn start --reset-cache`

To run on your iOS device, connect it to the Mac, open Xcode

[TO BE CONTINUED]
