import { Caracteristica } from '../Models/caracteristicas';
import { Color } from '../Models/color.model';
import { Imagen } from '../Models/imagenes';
import { Producto } from '../Models/productos.model';

export interface cargarCaima {
    imagenes: Imagen [],
    caracteristicas : Caracteristica [],
    colores:Color[],
    producto : Producto
}