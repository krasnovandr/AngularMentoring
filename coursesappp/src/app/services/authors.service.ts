import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { AuthorDto } from '../models/author';
import { MultiselectModel } from '../models/multiselect';
import 'rxjs/operator/map';
@Injectable()
export class AuthorsService {

  constructor(private http: HttpClient) {
  }

  getAuthors() {
    const authorsUrl = 'authors';
    return this.http.get<AuthorDto[]>(`${environment.apiEndpoints.apiUrl}/${authorsUrl}`)
      .map(authors => authors.map((authorDto) => this.mapFromDto(authorDto)));
  }


  mapFromDto(author: AuthorDto): MultiselectModel {
    const result = new MultiselectModel();
    result.id = author.id;
    result.name = `${author.firstName} ${author.lastName}`;

    return result;
  }
}
