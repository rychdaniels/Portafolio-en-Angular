import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
 
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  // Bandera para saber cuando esta cargando los datos
  cargando = true;
  productos: Producto[] = [];


  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    this.http.get('https://angular-html-49e53.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        console.log(resp);
        this.productos = resp;

        setTimeout(() => {
          this.cargando = false;
        }, 1200)
        
      });

  }
}
