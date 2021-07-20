import { Pedido } from '../Models/pedidos.model';

export interface cargaPedidos {
    pedidos: Pedido[],
    cantidad: number,
    total:number
}