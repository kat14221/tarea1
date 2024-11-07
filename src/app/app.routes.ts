import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SeccionComponent } from './component/seccion/seccion.component';
import { CategoriaComponent } from './component/categoria/categoria.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'categoria',
        component: CategoriaComponent,
        title: 'Categoria'
    },
    {
        path: 'seccion',
        component: SeccionComponent,
        title: 'Seccion'
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
