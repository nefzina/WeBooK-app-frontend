import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  constructor() {
  }

  private userId = new BehaviorSubject(0);
  getUserId = this.userId.asObservable();

  setUserId(id: number) {
    this.userId.next(id);
  }
}
