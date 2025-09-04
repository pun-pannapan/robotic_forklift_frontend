import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForkliftDto } from '../../core/models/api-models';
import { PagedResult } from '../../core/models/paged-result';
import { ApiService } from '../../core/services/api.service';

@Component({
  standalone: true,
  selector: 'app-forklifts',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './forklifts.component.html'
})
export class ForkliftsComponent implements OnInit {
  page = 1; size = 20; total = 0; rows: ForkliftDto[] = [];
  search = '';
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }

  onSearch() {
    this.page = 1;
    this.load();
  }

  clearSearch() {
    this.search = '';
    this.page = 1;
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getForklifts(this.page, this.size, this.search).subscribe({
      next: (res: PagedResult<ForkliftDto>) => {
        this.rows = res.items ?? [];
        this.total = (res as any).totalItems ?? 0;
        this.loading = false;
      },
      error: _ => { this.rows = []; this.total = 0; this.loading = false; }
    });
  }
}