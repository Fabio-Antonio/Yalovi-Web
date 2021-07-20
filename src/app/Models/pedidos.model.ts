export class Pedido {
    constructor(
        public uid:string,
        public producto:string,
        public token:string,
        public nombre_producto: string,
        public precio:number,
        public cantidad:number,
        public marca:string,
        public url_imagen:string,
        public color:string,
        public talla:string

    ){

    }
}