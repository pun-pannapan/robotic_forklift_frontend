import { Component, inject, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ForkliftDto } from  '../../core/models/api-models';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, DatePipe],
  templateUrl: './logs.component.html'
})
export class LogsComponent {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  forklifts = signal<ForkliftDto[]>([]);
  rows: any[] = [];

  form = this.fb.group({
    forkliftId: ['']
  });

  constructor() {
    this.api.getForklifts(1, 1000).subscribe(res => this.forklifts.set(res.items || []));
    this.load();
  }

  load() {
    const raw = this.form.value.forkliftId;
    const id = raw !== null && raw !== undefined && String(raw) !== '' ? Number(raw) : undefined;

    if (id) {
      this.api.getCommandLogs(id, 1, 50).subscribe((res: any) => {
        this.rows = Array.isArray(res) ? res : (res?.items ?? []);
      });
    } else {
      this.api.getAllCommandLogs().subscribe((res: any) => {
        this.rows = Array.isArray(res) ? res : (res?.items ?? []);
      });
    }
  }

  trackByForklift = (_: number, f: ForkliftDto) => f.id;
  trackByRow = (_: number, r: any) => r.id ?? r.createdAt;
}