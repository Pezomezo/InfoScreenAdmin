import { Observable, from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule,
         MatGridListModule, MatDialogModule,
         MAT_LABEL_GLOBAL_OPTIONS,
         MatFormFieldModule, MatTooltipModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GroupListComponent } from './group-list/group-list.component';
import { UrlListComponent } from './url-list/url-list.component';
import { MagicComponent } from './magic/magic.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateUrlComponent } from './create-url/create-url.component';
import { PresentationSettingsComponent } from './presentation-settings/presentation-settings.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    GroupListComponent,
    UrlListComponent,
    MagicComponent,
    LoginComponent,
    RegisterComponent,
    CreateUrlComponent,
    PresentationSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    HttpClientModule,
    PdfViewerModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ScrollingModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  entryComponents: [
    CreateUrlComponent,
    PresentationSettingsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
