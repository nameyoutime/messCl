import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
const importModule = [
  CommonModule,
  SharedRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  PickerModule,
  EmojiModule
]
const materialModule = [
  MatDialogModule
]
const exportModule = [

]

@NgModule({
  declarations: [],
  imports: [
    importModule,
    materialModule
  ], exports: [

  ]
})
export class SharedModule { }
