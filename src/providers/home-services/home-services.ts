import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Vehiculo } from "../../interfaces/vehiculo.Interface";

/*
  Generated class for the HomeServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello HomeServicesProvider Provider');
  }

  getJsonData(){
    this.headersPost = new Headers({
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*'
    });

    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return this.http.get('http://192.168.2.209:8080/runt/webresources/co.edu.runt.entidades.vehiculo', optionspost).map(res => res.json());
  }

  registrarSoat(vehiculo: Vehiculo, numeroPolisa: string, entidadExpide: string, fechaExpedicion: Date,
                fechaInicio: Date, fechaFin: Date) {

        const vehiculoJson = { autoridadTransito: vehiculo.autoridadTransito,
                cilindraje: vehiculo.cilindraje,
                color: vehiculo.color,
                fechaMatricula: vehiculo.fechaMatricula,
                linea: vehiculo.linea,
                marca: vehiculo.marca,
                modelo: vehiculo.modelo,
                numeroChasis: vehiculo.numeroChasis,
                numeroMotor: vehiculo.numeroMotor,
                numeroSerie: vehiculo.numeroSerie,
                numeroVin: vehiculo.numeroVin,
                placa: vehiculo.placa,
                tipoCarroceria: vehiculo.tipoCarroceria,
                tipoCombustible: vehiculo.tipoCombustible };

        const body = {entidadexpide: entidadExpide, estado: 'Activo', fechaexpedicion: fechaExpedicion,
                  fechafinVigencia: fechaInicio, fechainiciovigencia: fechaFin,
                  numeropolisa: numeroPolisa, placa: vehiculoJson};

                  console.log(body);
    
        this.http.post('http://192.168.2.209:8080/runt/webresources/co.edu.runt.entidades.soat', body)
        .subscribe(data => {
          alert('Soat Registrado Exitosamente!');
        });
  }

  registrarTecno(vehiculo: Vehiculo, entidadExpide: string, tipoRevision: string, fechaExpedicion: Date, fechaFin: Date) {

    const vehiculoJson = { autoridadTransito: vehiculo.autoridadTransito,
        cilindraje: vehiculo.cilindraje,
        color: vehiculo.color,
        fechaMatricula: vehiculo.fechaMatricula,
        linea: vehiculo.linea,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        numeroChasis: vehiculo.numeroChasis,
        numeroMotor: vehiculo.numeroMotor,
        numeroSerie: vehiculo.numeroSerie,
        numeroVin: vehiculo.numeroVin,
        placa: vehiculo.placa,
        tipoCarroceria: vehiculo.tipoCarroceria,
        tipoCombustible: vehiculo.tipoCombustible };

    const body = {entidadExpide: entidadExpide, estado: 'Activo', fechaExpedicion: fechaExpedicion,
    fechaVigencia: fechaFin, tipoRevision: tipoRevision, id: '5', placa: vehiculoJson};

          console.log(body);

    this.http.post('http://192.168.2.209:8080/runt/webresources/co.edu.runt.entidades.tecno', body)
    .subscribe(data => {
      alert('Tecno Registrado Exitosamente!');
    });
}

}
