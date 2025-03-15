// src/app/services/client.service.ts
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientId: string;

  constructor() {
    // Try to get the clientId from local storage, otherwise generate a new one.
    const storedId = localStorage.getItem('clientId');
    if (storedId) {
      this.clientId = storedId;
    } else {
      this.clientId = uuidv4();
      localStorage.setItem('clientId', this.clientId);
    }
  }
}
