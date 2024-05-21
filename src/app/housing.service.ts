import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  
  constructor() { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching housing location with ID ${id}: ${response.statusText}`);
      }
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        return undefined;
      }
      return data as HousingLocation;
    } catch (error) {
      console.error('Error:', error);
      return undefined;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
