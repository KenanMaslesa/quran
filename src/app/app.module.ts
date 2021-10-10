import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpeakingComponent } from './components/speaking/speaking.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QuranTwoPagesComponent } from './components/quran-twopages/quran.component';
import { QuranOnePageComponent } from './components/quran-onepage/quran.component';
import { QuranHeaderComponent } from './components/quran-header/quran-header.component';
import { QuranComponent } from './pages/quran/quran.component';
import { QuranTranslationComponent } from './components/quran-translation/quran-translation.component';
import { RuqyahComponent } from './pages/ruqyah/ruqyah.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeakingComponent,
    LoaderComponent,
    QuranTwoPagesComponent,
    QuranOnePageComponent,
    QuranHeaderComponent,
    QuranComponent,
    QuranTranslationComponent,
    RuqyahComponent
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
