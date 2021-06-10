import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeakingComponent } from './components/speaking/speaking.component';

const routes: Routes = [
  {path: '', component: SpeakingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
