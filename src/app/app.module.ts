import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from './shared/shared/shared.module';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendReqDialogComponent } from './components/friend-req-dialog/friend-req-dialog.component';
import { AlreadyFriendPipe } from './pipes/already-friend.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { CreateGroupDialogComponent } from './components/create-group-dialog/create-group-dialog.component';
import { NgxImageCompressService } from "ngx-image-compress";
import { GroupMenuDialogComponent } from './components/group-menu-dialog/group-menu-dialog.component';
import { ConfirmDelDialogComponent } from './components/confirm-del-dialog/confirm-del-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchDialogComponent,
    FriendReqDialogComponent,
    AlreadyFriendPipe,
    ImageDialogComponent,
    CreateGroupDialogComponent,
    GroupMenuDialogComponent,
    ConfirmDelDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [NgxImageCompressService],
})
export class AppModule { }
