import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuranComponent } from './components/quran/quran.component';
import { SpeakingComponent } from './components/speaking/speaking.component';

const routes: Routes = [
  {path: '', component: SpeakingComponent},
  {path: 'quran', component: QuranComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
