import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { AuthorReadItemDto } from '../models/author';
import { MultiselectModel } from '../models/multiselect';

@Injectable()
export class AuthorsService {

  constructor(private http: HttpClient) {
  }

  getAuthors() {
    const authorsUrl = 'authors';
    return this.http.get<AuthorReadItemDto[]>(`${environment.apiEndpoints.apiUrl}/${authorsUrl}`)
      .map(authors => authors.map((authorDto) => this.mapFromDto(authorDto)));
  }


  mapFromDto(author: AuthorReadItemDto): MultiselectModel {
    const result = new MultiselectModel();
    result.id = author.id;
    result.name = `${author.firstName} ${author.lastName}`;

    return result;
  }
}
