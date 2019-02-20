import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Diagnostic } from "@ionic-native/diagnostic";
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
//import { Clipboard } from '@ionic-native/clipboard/ngx';


import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { SelectCountriesCodeComponent } from '../components/select-countries-code/select-countries-code';
import { FirebasePhoneNumberCheckComponent } from '../components/firebase-phone-number-check/firebase-phone-number-check';
import { MoreOptionsComponent } from '../components/more-options/more-options';
import { ProductListComponent } from '../components/product-list/product-list';
import { ProductSearchbarComponent } from '../components/product-searchbar/product-searchbar';
import { ProductSearchOptionsComponent } from '../components/product-search-options/product-search-options';
import { OrderListComponent } from '../components/order-list/order-list';
import { OrderStatusComponent } from '../components/order-status/order-status';

import { AuthProvider } from '../providers/auth/auth';
import { RedirectIfNotAuthProvider } from '../providers/redirect-if-not-auth/redirect-if-not-auth';
import { RefreshTokenInterceptor } from '../providers/auth/refresh-token-interceptor';
import { ChatGroupFbProvider } from '../providers/firebase/chat-group-fb';
import { ChatMessageHttpProvider } from '../providers/http/chat-message-http';
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { UserProfileHttp } from '../providers/http/user-profile-http';
import { ChatGroupViewerProvider } from '../providers/chat-group-viewer/chat-group-viewer';
import { StoragePermissionProvider } from '../providers/storage-permission/storage-permission';
import { CategoryHttpProvider } from '../providers/http/category-http';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { ChatInvitationProvider } from '../providers/chat-invitation/chat-invitation';
import { ProductHttpProvider } from '../providers/http/product-http';
import { ProductSearchProvider } from '../providers/product-search/product-search';
import { OrderHttpProvider } from '../providers/http/order-http';


import { DirectivesModule } from '../directives/directives.module';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { PipesModule } from '../pipes/pipes.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { TestePage } from '../pages/teste/teste';
import { LoginPhoneNumberPage } from '../pages/login-phone-number/login-phone-number';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';
import { ResetPhoneNumberPage } from '../pages/reset-phone-number/reset-phone-number';
import { ChatMessagePageModule } from '../pages/chat-messages/chat-message/chat-message.module';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ProductPhotosPage } from '../pages/product-photos/product-photos';
import { OrderStorePage } from '../pages/order-store/order-store';
import { OrderDetailPage } from '../pages/order-detail/order-detail';





function jwtFactory(authService: AuthProvider) {
  return {
      whitelistedDomains: [
        //new RegExp('whatsapp-laravel.test/*'),
        //new RegExp('192.168.0.106:8000/*'),
        new RegExp('192.168.1.7:8000/*')

      ],
      tokenGetter: () => {
        return authService.getToken();
      }
  }
}


@NgModule({
  declarations: [
    MyApp,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    CustomerCreatePage,
    ProductDetailPage,
    ProductPhotosPage,
    OrderStorePage,
    OrderDetailPage,
    HomePage,
    ListPage,
    TestePage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent,
    ProductListComponent,
    ProductSearchbarComponent,
    ProductSearchOptionsComponent,
    OrderListComponent,
    OrderStatusComponent


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagePageModule,
    PipesModule,
    DirectivesModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthProvider]
      }
    })   

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    MainPage,
    CustomerCreatePage,
    ProductDetailPage,
    ProductPhotosPage,
    OrderStorePage,
    OrderDetailPage,
    HomePage,
    ListPage,
    TestePage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent,
    ProductListComponent,
    ProductSearchbarComponent,
    ProductSearchOptionsComponent,
    OrderListComponent,
    OrderStatusComponent

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,    
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    Media,
    File,
    ChatGroupFbProvider,
    ChatGroupViewerProvider,
    StoragePermissionProvider,
    Diagnostic,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    RedirectIfNotAuthProvider,
    FirebaseMessaging,
    PushNotificationProvider,
    UserProfileHttp,
    FirebaseDynamicLinks,
    ChatInvitationProvider,
    ProductHttpProvider,
    ProductSearchProvider,
    CategoryHttpProvider,
    OrderHttpProvider,
   // Clipboard
   
  ]
})
export class AppModule {}
