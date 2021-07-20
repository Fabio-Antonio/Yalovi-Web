export class Producto {
    constructor(
        public uid: string,
        public sub_categoria: string,
        public nombre_producto: string,
        public precio : number,
        public marca : string,
        public url_imagen: string,
        public segunda_mano : boolean,
        public descuento : boolean,
        ){
        

    }
}