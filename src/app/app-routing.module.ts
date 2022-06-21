import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { OriginsComponent } from './origins/origins.component';

const routes: Routes = [
  {path: '', redirectTo: '/origins', pathMatch: 'full'},
  {path: 'origins', component: OriginsComponent},
  {path: 'creation/:origin', component: CharacterCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
