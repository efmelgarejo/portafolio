import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise( (resolve, reject) => {
      this.http.get('https://angularportafolio.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[]) =>{
        this.productos = resp;
        //console.log(resp);
        this.cargando = false;
        resolve();
      })
    })
    
  }

  getProducto(id: string){
    return this.http.get(`https://angularportafolio.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto( termino: string ){

    if( this.productos.length === 0 ){
      //cargar productos
      this.cargarProductos().then( () =>{
        //Ejecutar despues de tener los productos
        // aplicar filto
        this.filtrarProductos( termino );
      })
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

    
  }

  private filtrarProductos( termino: string ){
    this.productosFiltrado = [];
    //console.log(this.productos);

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }

    })
    
  }

}
