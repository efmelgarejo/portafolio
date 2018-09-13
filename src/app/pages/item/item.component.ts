import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescrpcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescrpcion;
  id: string;

  constructor(private route: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params
      .subscribe( parametros => {
        // console.log(parametros['id'])
        this.productoService.getProducto(parametros['id'])
            .subscribe( (producto: ProductoDescrpcion) => {
              this.id = parametros['id'];
              this.producto = producto
            })
      })
  }

}
