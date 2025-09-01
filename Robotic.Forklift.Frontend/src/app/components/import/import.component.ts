import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [NgIf],
  templateUrl: './import.component.html'
})
export class ImportComponent {
  private api = inject(ApiService);
  file?: File;
  uploading = false;
  ok = false;
  error = '';

  pick(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.file = input.files?.[0] || undefined;
  }

  upload() {
    if (!this.file) return;
    this.uploading = true;
    this.ok = false; this.error = '';
    this.api.importForklifts(this.file).subscribe({
      next: _ => { this.ok = true; this.uploading = false; },
      error: err => { this.error = err?.error?.message || 'Upload failed'; this.uploading = false; }
    });
  }
}