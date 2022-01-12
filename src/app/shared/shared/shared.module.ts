import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import {HttpClientModule} from '@angular/common/http'
const importModule = [
  CommonModule,
  SharedRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
]
const exportModule = [

]

@NgModule({
  declarations: [],
  imports: [
    importModule
  ],exports:[

  ]
})
export class SharedModule { }
