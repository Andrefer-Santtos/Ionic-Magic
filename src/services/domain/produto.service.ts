import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "src/config/api.config";
import { ProdutoDTO } from "src/models/produto.dto";

@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findById(produto_id: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }
}