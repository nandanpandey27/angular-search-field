import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class HttpService {
     
    private nearByLandmark="location/landmarkSearch"

    constructor(private httpClient:HttpClient) { }

    //Get landmarks for city gurgaon and user search input
    getLandMarks(requestData: any) : Observable<any>{
        return this.httpClient.post(environment.realApiURL+this.nearByLandmark,requestData,{ headers:{ 'Content-Type': 'application/json' } , observe: 'response'});
    }
}