import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuranTwoPagesComponent } from './components/quran-twopages/quran.component';
import { SpeakingComponent } from './components/speaking/speaking.component';
import { QuranComponent } from './pages/quran/quran.component';
import { RuqyahComponent } from './pages/ruqyah/ruqyah.component';

const routes: Routes = [
  {path: '', component: QuranComponent},
  {path: 'quran', component: QuranComponent},
  {path: 'test', component: SpeakingComponent},
  {path: 'rukja', component: RuqyahComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
