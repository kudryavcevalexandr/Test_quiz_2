# Front camera integration notes

## Library choice and install command

Use `react-native-vision-camera` for a React Native CLI app. It is the maintained, high-performance camera library for native React Native projects and supports preview, photos, video, device selection, and later frame processors.

```sh
npm install react-native-vision-camera react-native-nitro-modules react-native-nitro-image
cd ios && pod install
```

> Note: the package install was attempted in this environment, but the configured npm registry returned `403 Forbidden`. The dependency entries were added to `package.json`; run the command above in an environment with registry access to refresh `package-lock.json`.

## Android permissions

Add camera and microphone permissions to `android/app/src/main/AndroidManifest.xml` above the `<application>` tag:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

## iOS permissions

Add these keys to `ios/<YourApp>/Info.plist` inside the root `<dict>`:

```xml
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your Camera to show the front camera preview.</string>
<key>NSMicrophoneUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your Microphone for future video recording with audio.</string>
```
