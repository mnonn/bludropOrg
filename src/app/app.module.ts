import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UtilService } from '../helper/util.service';
import { ScanService } from '../pages/scan/scan.service';
import { ToastHelperService } from '../pages/ui-helper/toast-helper.service';
import { MyApp } from './app.component';

import { HomeComponent } from '../pages/home/home.component';
import { TabsComponent } from '../pages/tabs/tabs.component';
import { ScanComponent } from '../pages/scan/scan.component'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

@NgModule({
    declarations: [
        MyApp,
        HomeComponent,
        TabsComponent,
        ScanComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [
        MyApp,
        HomeComponent,
        TabsComponent,
        ScanComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScanService,
        Camera,
        ToastHelperService,
        UtilService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
