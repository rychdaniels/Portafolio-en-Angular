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
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    // Se usa una promesa para asegurarnos que al realizar una busqueda los productos ya se encuentren cargados
    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-49e53.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          // console.log(resp);
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
          }, 800);
          resolve();          
      });
    });

  }

  getProductos( id: String ){
    return this.http.get(`https://angular-html-49e53.firebaseio.com/productos/${id}.json`);
  }


  buscarProducto ( termino: string ){

    if( this.productos.length === 0 ) {
      // Se deben cargar los productos
      this.cargarProductos().then(() => {
        // Con ayuda del then ejecutamos el filtro, despues de haber cargado los productos
        this.filtrarProductos( termino );
      });

    } else {
      // Aplicar el filtro
      this.filtrarProductos( termino );
    }   
  }

  private filtrarProductos ( termino: string ) {
    // Pasamos a minusculas el termino para realizar la busqueda
    termino = termino.toLowerCase();

    // console.log(this.productos);
    // Vaciamos el arreglo cada vez que el usuario realice una busqueda
    this.productosFiltrado = [];
    // Con el forEach recorremos y buscamos si en la categoria hay algun elemento que coincida con algo de la busqueda
    this.productos.forEach( prod => {
      // Variable para realizar la busqueda por titulo en minusculas 
      const tituloLower = prod.titulo.toLowerCase();

      if (  prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        // Si coincide lo agregamos al arreglo para despues mostrarlo en los resultados
        this.productosFiltrado.push( prod );
      }
    });
  }
}
