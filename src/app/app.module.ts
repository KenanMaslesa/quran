import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpeakingComponent } from './components/speaking/speaking.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QuranComponent } from './components/quran/quran.component';
import { QuranOnePageComponent } from './components/quran-onepage/quran.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeakingComponent,
    LoaderComponent,
    QuranComponent,
    QuranOnePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
