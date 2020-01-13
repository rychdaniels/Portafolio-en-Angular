import { NgModule, Component } from '@angular/core';

// Para poder utilizar Routes
import { Routes, RouterModule } from '@angular/router';

// Inportaciones necearias para realizar el redireccionamiento
import { PortafolioComponent } from './pages/portafolio/portafolio.component'
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';
import { SearchComponent } from './pages/search/search.component'

//Constante donde se alamcenarán las rutas para la aplicacion
const app_routes: Routes = [    
    // Si la dirrecion es vacio
    { path: 'home', component: PortafolioComponent },
    { path: 'about', component: AboutComponent }, //Si la direccion contiene 'about'
    { path: 'item/:id', component: ItemComponent },
    { path: 'search/:termino', component: SearchComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }//Si no es ninguna de las rutas anteriores, me redirecciona al home

];

@NgModule({

    //Usamos las rutas que creamos anteriormente
    imports: [
        RouterModule.forRoot( app_routes, { useHash: true } )
    ],
    //Exportamos el RouterModule(mis rutas) para poderlo usar desde afuera
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule{ }