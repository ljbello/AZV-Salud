package com.qwihi.salud.azv;

import android.app.Application;
import com.onesignal.OneSignal;

public class ExampleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // TODO: Add OneSignal initialization here
        OneSignal.startInit(this)
                .inFocusDisplaying(OneSignal.OSInFocusDisplayOption.Notification)
                .unsubscribeWhenNotificationsAreDisabled(true)
                .init();
        OneSignal.promptLocation();
        OneSignal.setLocationShared(true);
    }
}
