import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
   public guardados:Registro[]=[];
   private _storage: Storage | null = null;
  constructor(private storage: Storage, private navCtrl:NavController, private inAppBrowser:InAppBrowser) { 

    this.init();
    this.cargarStorage();
   
  }

  async cargarStorage(){
    this.guardados=await this.storage.get('registro') || [];
  }

 
 async guardarRegistro(format:string,text:string){

    await this.cargarStorage();

    const nuevoRegistro= new Registro (format,text );
    this.guardados.unshift(nuevoRegistro);
    this._storage?.set('registro', this.guardados);
     this.abrirRegistro(nuevoRegistro);
    //console.log('Data Local: ',this.guardados)

  }



  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


 async abrirRegistro(registro:Registro){

    this.navCtrl.navigateForward('/tabs/tab2');

    switch(registro.type){
      
      case 'http':
       
      //this.inAppBrowser.create(registro.text,'_system');
      await Browser.open({ 
        url: registro.text, 
        windowName: '_system' 
      })
      console.log('URL QUE ABRIO : ',JSON.stringify(registro));
      break;

    }

  }

}
