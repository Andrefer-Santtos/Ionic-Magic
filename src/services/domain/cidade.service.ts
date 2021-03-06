import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "src/config/api.config";
import { CidadeDTO } from "src/models/cidade.dto";
import { Observable } from "rxjs";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {}

    findAll(estado_id: string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}