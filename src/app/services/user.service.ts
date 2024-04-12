import { config } from './../config/environment';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { UtilityService } from './utility.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private rest: RestService,
    private utilityService: UtilityService
  ) {}

  getUsers(body: any) {
    return lastValueFrom(
      this.rest.get(
        config.API_URL + 'users',
        this.utilityService.getQueryParams(body)
      )
    );
  }
  getUserDetails(id: string) {
    return this.rest.get(config.API_URL + 'users/' + id);
  }
}
