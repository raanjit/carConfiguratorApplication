import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigList } from "./config";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getConfigByModelCode(modelCode: string): Observable<ConfigList> {
    return this.http.get<ConfigList>("/options/" + modelCode);
  }
}
