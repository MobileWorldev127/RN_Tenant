package com.foxtons.tenancytracker;

// import android.app.Application;

// import com.facebook.react.ReactApplication;
// // import com.RNFetchBlob.RNFetchBlobPackage;
// // import com.shahenlibrary.RNVideoProcessingPackage;
// // import io.invertase.firebase.RNFirebasePackage;
// // import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
// // import com.reactnative.photoview.PhotoViewPackage;
// // import com.brentvatne.react.ReactVideoPackage;
// // import org.wonday.pdf.RCTPdfView;
// // import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// // import com.pusherman.networkinfo.RNNetworkInfoPackage;
// // import com.imagepicker.ImagePickerPackage;
// // import com.learnium.RNDeviceInfo.RNDeviceInfo;
// // import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
// // import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
// import com.facebook.react.ReactNativeHost;
// import com.facebook.react.ReactPackage;
// import com.facebook.react.shell.MainReactPackage;
// import com.facebook.soloader.SoLoader;

// import java.util.Arrays;
// import java.util.List;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    // @Override
    // protected List<ReactPackage> getPackages() {
    //   return Arrays.<ReactPackage>asList(
    //       new MainReactPackage()
    //       // new RNFetchBlobPackage(),
    //       // new RNVideoProcessingPackage(),
    //       // new RNFirebasePackage(),
    //       // new RNFirebaseAnalyticsPackage(),
    //       // new PhotoViewPackage(),
    //       // new ReactVideoPackage(),
    //       // new RCTPdfView(),
    //       // new RNDeviceInfo(),
    //       // new ReactNativePushNotificationPackage(),
    //       // new ImagePickerPackage(),
    //       // new ReactNativeDocumentPicker(),
    //       // new DocumentPickerPackage()
    //       // new RNNetworkInfoPackage()
    //   );
    // }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.awesomeproject.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
