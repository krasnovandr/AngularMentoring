import { Injectable } from '@angular/core';
import { AuthorDto } from '../models/author';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthorsService {

  constructor(private http: HttpClient) {
  }

  getAuthors() {
    const authorsUrl = 'authors';
    return this.http.get<AuthorDto[]>(`${environment.apiEndpoints.apiUrl}/${authorsUrl}`);
  }
}
