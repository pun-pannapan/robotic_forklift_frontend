import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ForkliftDto,
  FolkliftCommandDto,
  SendCommandRequest,
  ParsedActionDto,
} from '../models/api-models';
import { PagedResult } from '../models/paged-result';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private api_base = environment.apiBaseUrl;

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getForklifts(page = 1, size = 1000, search?: string): Observable<PagedResult<ForkliftDto>> {
    let params = new HttpParams().set('page', page).set('size', size);
     if (search && search.trim().length > 0) {
        params = params.set('search', search.trim());
      }
    return this.http.get<PagedResult<ForkliftDto>>(`${this.api_base}/Forklifts`, {
      params,
      headers: this.authHeaders(),
    });
  }

  sendCommand(payload: SendCommandRequest): Observable<ParsedActionDto[]> {
    return this.http.post<ParsedActionDto[]>(`${this.api_base}/Commands`, payload, {
      headers: this.authHeaders(),
    });
  }

  getCommandLogs(
    forkliftId?: number,
    page = 1,
    size = 50
  ): Observable<PagedResult<FolkliftCommandDto>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (forkliftId) params = params.set('forkliftId', forkliftId);

    return this.http.get<PagedResult<FolkliftCommandDto>>(`${this.api_base}/Commands/logs`, {
      params,
      headers: this.authHeaders(),
    });
  }

  importForklifts(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.api_base}/Forklifts/import`, form, {
      headers: this.authHeaders(),
    });
  }

   getAllCommandLogs() {
    return this.http.get<FolkliftCommandDto[]>(
      `${this.api_base}/Commands/logs/all`,
      { headers: this.authHeaders() }
    );
  }
}