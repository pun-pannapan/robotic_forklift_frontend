import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ForkliftDto, SendCommandRequest, ParsedActionDto } from '../../core/models/api-models';

@Component({
  selector: 'app-commands',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './commands.component.html',
})
export class CommandsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  forklifts = signal<ForkliftDto[]>([]);
  sending = false;
  submitted = false;
  error = '';
  ok = false;
  result: ParsedActionDto[] = [];

  form = this.fb.group({
    forkliftId: ['', Validators.required],
    command: ['', Validators.required],
  });

  ngOnInit() {
    this.api.getForklifts(1, 1000).subscribe({
      next: res => this.forklifts.set(res.items || []),
      error: _ => this.error = 'Cannot load forklifts.'
    });
  }

  submit() {
    this.submitted = true;
    this.ok = false;
    this.error = '';
    this.result = [];
    if (this.form.invalid) return;

    this.sending = true;
    const payload: SendCommandRequest = { ...(this.form.value as any), issuedByUserId: 1 };

    this.api.sendCommand(payload).subscribe({
      next: (actions) => { this.result = actions || []; this.ok = true; this.sending = false; },
      error: (err) => { this.error = err?.error?.message || 'Failed to send command.'; this.sending = false; }
    });
  }
}