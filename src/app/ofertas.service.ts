import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta }  from './shared/oferta.model'
//import { toPromise } from 'rxjs/operators'

import { URL_API } from './app.api'
import { Observable } from '../../node_modules/rxjs';
import { map, retry } from 'rxjs/operators';

//import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService{
 
    

    constructor(private http: Http){

    }

    public getOfertas():Promise<Oferta[]>{
     return   this.http.get(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta:any)=> resposta.json())

    }
    
   public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{
       return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
       .toPromise()
       .then((response: any)=> response.json() )
   }
      
   public getOfertasPorId(Id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${Id}`)
    .toPromise()
    .then((response: any )=>{
        return response.json()[0]
    })
  }

  public getComoUsarOfertaPorId(id: number): Promise<string>{
      return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any)=>{
                return resposta.json()[0].descricao
            })
  }

  public getAondeFicaPorId(id: number): Promise<string>{
      return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: any)=>{
          return resposta.json()[0].descricao
      })
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]>{
      return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
      .pipe(retry(10), map((resposta: any)=>resposta.json()))
        
  }
}