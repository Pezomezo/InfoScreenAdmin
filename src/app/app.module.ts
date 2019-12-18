import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule, MatGridListModule  } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GroupListComponent } from './group-list/group-list.component';
import { UrlListComponent } from './url-list/url-list.component';
import { MagicComponent } from './magic/magic.component';
import { IndividualScreensListComponent } from './individual-screens-list/individual-screens-list.component';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    GroupListComponent,
    UrlListComponent,
    MagicComponent,
    IndividualScreensListComponent,
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
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
