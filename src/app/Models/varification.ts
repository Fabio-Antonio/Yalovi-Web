export class Verification {
    constructor(
        public token : string,
        public correo : string,
        public numero_verificacion : Number,
        public status : boolean

    ){

    }
}