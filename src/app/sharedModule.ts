import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
  MdTableModule,
  MdDialogModule,
  MdProgressSpinnerModule,
  MdTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponentModule } from './components/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  exports: [
    MdTabsModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdTableModule,
    MdSelectModule,
    MdIconModule,
    MdListModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    HeaderComponentModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    MomentModule,
    TranslateModule,
    CustomFormsModule
  ]
})
export class SharedModule {
}
