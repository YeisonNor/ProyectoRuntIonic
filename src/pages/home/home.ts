import { Component } from '@angular/core';
import { Refresher } from 'ionic-angular';
import { Vehiculo } from '../../interfaces/vehiculo.Interface';
import { VEHICULOS } from '../../data/data.vehiculos';
import { AlertController, LoadingController } from 'ionic-angular';
import { HomeServicesProvider } from "../../providers/home-services/home-services";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  //vehiculos:Vehiculo[] = [];
  loading: any
  vehiculos: any

  placa: string;
  entidadExpide: string;
  fechaInicio: string;
  fechaExpedicion: string;
  numeroPolisa: string;

  cargaInicial: boolean = true;


  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public homeProvider: HomeServicesProvider) {
    this.vehiculos = VEHICULOS.slice(0);

    /*this.loading = this.loadingCtrl.create({
      content: '<ion-spinner></ion-spinner>'
    });
    
    this.getData();*/
  }

  

  getData(){
    
    if(this.cargaInicial) {
      this.loading.present();
      this.cargaInicial = false;
    }
    this.homeProvider.getJsonData().subscribe(
      result => {
        this.vehiculos = result;
        console.log("success: " + this.vehiculos);
      },
      err => {
        console.error("Error: " + err);
      },
      () => {
        this.loading.dismiss();
        console.log("getData Completed!");
      }
    );
  }

  mostrar_datos_vehiculo(vehiculo:Vehiculo) 
  {
    const alert = this.alertCtrl.create({
      title: vehiculo.marca  + ' ' + vehiculo.linea,
      subTitle: '<b>Placa:</b> ' + vehiculo.placa + '<br />'
                + '<b>Modelo:</b> ' + vehiculo.modelo + '<br />'
                + '<b>Color:</b> ' + vehiculo.color + '<br />'
                + '<b>Número Serie:</b> ' + vehiculo.numeroSerie + '<br />'
                + '<b>Número Motor:</b> ' + vehiculo.numeroMotor + '<br />'
                + '<b>Número Chasis:</b> ' + vehiculo.numeroChasis + '<br />'
                + '<b>Número Vin:</b> ' + vehiculo.numeroVin + '<br />'
                + '<b>Carroceria:</b> ' + vehiculo.tipoCarroceria + '<br />'
                + '<b>Combustible:</b> ' + vehiculo.tipoCombustible + '<br />'
                + '<b>Autoridad Transito:</b> ' + vehiculo.autoridadTransito + '<br />'
                + '<b>Fecha Matricula:</b> ' + vehiculo.fechaMatricula + '<br />',
      buttons: ['Ok']
    });
    alert.present();
  }

  mostrar_formulario_soat(vehiculo: Vehiculo)
  {
    const alert = this.alertCtrl.create({
      title: 'Registrar SOAT',
      inputs: [
        {
          name: 'numeroPolisa',
          placeholder: 'Número Poliza',
          type: 'number'
        },
        {
          name: 'fechaInicio',
          placeholder: 'Fecha Inicio',
          type: 'date'
        },
        {
          name: 'entidadExpide',
          placeholder: 'Entidad Expide'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Registrar',
          handler: data => {
            var fechaActual = new Date();

            //this.placa = placa;
            this.entidadExpide = data.entidadExpide;
            this.fechaInicio = data.fechaInicio;
            this.numeroPolisa = data.numeroPolisa;

            var f = this.fechaInicio.split('-');
            var fechaInicio = new Date(parseFloat(f[0]), parseFloat(f[1]) - 1, parseFloat(f[2]));
            var year = fechaInicio.getFullYear();
            var month = fechaInicio.getMonth();
            var day = fechaInicio.getDate();
            var fechaFin = new Date(year + 1, month, day);
            
            this.homeProvider.registrarSoat(vehiculo, this.numeroPolisa, this.entidadExpide, fechaActual, fechaInicio, fechaFin);
          }
        }
      ]
    });

    alert.present();
  }

  mostrar_formulario_tecno(vehiculo: Vehiculo)
  {
    const alert = this.alertCtrl.create({
      title: 'Registrar Tecno',
      inputs: [
        {
          name: 'entidadExpide',
          placeholder: 'Entidad Expide',
          type: 'text'
        },
        {
          name: 'tipoRevision',
          placeholder: 'Tipo Revisión',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Registrar',
          handler: data => {
            var fechaActual = new Date();
            var year = fechaActual.getFullYear();
            var month = fechaActual.getMonth();
            var day = fechaActual.getDate();
            var fechaFin = new Date(year + 1, month, day);
            
            this.homeProvider.registrarTecno(vehiculo, data.entidadExpide, data.tipoRevision, fechaActual, fechaFin);
          }
        }
      ]
    });
    alert.present();
  }


  recargar_vehiculos(refresher:Refresher)
  {
    console.log("Inicio del Refresh");
    setTimeout(() => {
      console.log("Terminó el refresh");
      this.getData();
      refresher.complete();
    }, 1500);
  }

  get_ruta_icono(marca:String)
  {
    return 'assets/vehiculos/' + marca + '.jpg';
  }

}
