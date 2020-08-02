import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public searchEmployee(
    name: string,
    page: number = 0
  ): Observable<Employee[]> {
    const url = this.API_URL + "/employees/search";
    let params = new HttpParams();
    params = params.append("name", name);
    params = params.append("page", page.toString());
    return this.http.get(url, { params }).pipe(
      map((response: any) => {
        return response.map((item) => new Employee().adapt(item));
      })
    );
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    const url = this.API_URL + `/employees`;
    return this.http
      .post(url, employee)
      .pipe(map((item) => new Employee().adapt(item)));
  }
}
