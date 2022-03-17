import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OriginsComponent } from './origins/origins.component';

const routes: Routes = [
  {path: '', component: OriginsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
