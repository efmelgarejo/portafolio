import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: any[] = []; 
  cargada = false;

  constructor(private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();

   }

   private cargarInfo(){
    //Leer el archivo JSON data_pagina
    this.http.get('assets/data/data_pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        //console.log(resp);
      });
   }

   private cargarEquipo(){
    //Leer el archivo JSON data_equipo o del Firebase
    this.http.get('https://angularportafolio.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {
        this.cargada = true;
        this.equipo = resp;
        //console.log(resp)
      })
   }

}
