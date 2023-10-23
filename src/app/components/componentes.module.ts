import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ScanSwipperComponent } from './scan-swipper/scan-swipper.component';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ScanSwipperComponent],
  exports:[ScanSwipperComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers:[]
})
export class ComponentesModule { }
