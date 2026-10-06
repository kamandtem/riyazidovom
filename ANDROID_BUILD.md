# Grade 2 App: Android Build Guide

## Prerequisites
- Node.js 16+ & npm
- JDK 11 (for Android build)
- Android SDK (via Android Studio)
- Capacitor CLI: `npm install -g @capacitor/cli`

## Steps

### 1. Web Build (Required First)
```bash
cd g2
npm run build
```
Creates optimized `dist/` folder for mobile.

### 2. Add Android Platform
```bash
npx cap add android
```
Generates `android/` directory with native project.

### 3. Copy Web Assets
```bash
npx cap copy
```
Syncs `dist/` into Android assets.

### 4. Open in Android Studio
```bash
npx cap open android
```

### 5. Build APK
In Android Studio:
1. Select **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for completion
3. APK located at `android/app/build/outputs/apk/debug/app-debug.apk`

### 6. Deploy to Device or Emulator
```bash
# Via adb
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or drag APK into Android Studio's emulator
```

## Troubleshooting

**Pod install issues (iOS):**
```bash
cd ios && pod install && cd ..
```

**Build cache issues:**
```bash
./gradlew clean
npm run build
npx cap copy
```

**JavaScript console on device:**
Use Chrome DevTools → chrome://inspect in desktop browser.

## Release Build
```bash
npx cap build android --release
```
Requires signing key (keystore file).

---

For more, see: https://capacitorjs.com/docs/android
