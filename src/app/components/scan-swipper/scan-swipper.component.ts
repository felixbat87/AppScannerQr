import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { DataLocalService } from 'src/app/services/data-local.service';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-scan-swipper',
  templateUrl: './scan-swipper.component.html',
  styleUrls: ['./scan-swipper.component.scss'],
})
export class ScanSwipperComponent  implements OnInit {
   addScanner:any;
   quitScanner:any;
   classHtml:string='';
   public inProcess: boolean = false;
 
  constructor(private router :Router, private dataLocal:DataLocalService) { }

  ngOnInit() {

 
    //window.document.querySelector('body')?.classList.add('scanner-active');

   
 

  }




    async scan(){

      this.inProcess = true;
      // Este es lo importante!
      window.document.querySelector('ion-content')?.classList.add('scanner-active');
      window.document.querySelector('ion-button')?.classList.add('texto');
    
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });
   
      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();
   
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // start scanning and wait for a result
   
      // if the result has content
      if (result.hasContent) {
         
        this.dataLocal.guardarRegistro(result.format,result.content);
        //console.log(result.content); // log the raw scanned content
        this.StopScan()
        window.document.querySelector('ion-button')?.classList.remove('texto');
        
      }else{
        this.StopScan();
      }
   
    }
   
 





  StopScan(){
    
 
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

  }


 


}
