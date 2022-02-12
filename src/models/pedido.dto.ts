import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagmentoDTO } from "./pagamento.dto";
import { RefDTO } from "./ref.dto";

export interface PedidoDTO {
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagmentoDTO;
    itens: ItemPedidoDTO[];
}