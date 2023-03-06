import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from "../../environments/environment";

const CONFIG_URL: string = environment.appConfig.url;

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;
  private url: string = CONFIG_URL;

  constructor(private http: HttpClient) {}

  public loadAppConfig() {

    return this.http
      .get<any>(this.url)
      .pipe(
        tap((config: any) => {
          this.appConfig = config;
        })
      )
      .toPromise();
  }
  public get config() {
    return this.appConfig;
  }

}
