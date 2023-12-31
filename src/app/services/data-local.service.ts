import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { EmailComposer } from 'capacitor-email-composer'



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
   public guardados:Registro[]=[];
   private _storage: Storage | null = null;
  constructor(private storage: Storage, private navCtrl:NavController) { 

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

      case 'geo':
       
       this.navCtrl.navigateForward(`/tabs/mapa/${registro.text}`);
      break;

    }

  }


  enviarCorreo(){
    const arrTemp=[];
    const titulos= 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push(titulos);

    this.guardados.forEach(registro=>{

     const linea=`${registro.type},${registro.format},${registro.created},${registro.text.replace(',',' ')}\n`;

     arrTemp.push(linea);

    });

   // console.log(arrTemp.join(''));

    this.crearArchivoFisico(arrTemp.join(''));

  }

   async crearArchivoFisico(text:string){


   await Filesystem.writeFile({
      path: 'registro.csv',
      data: text,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
   // console.log('Archivo creado');

  //  let readFile= await Filesystem.readFile({
  //   path:'registro.csv',
  //   directory:Directory.Documents,
  //   encoding:Encoding.UTF8,

  //  });

  




  };

  

  }





