import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ForkliftsComponent } from './components/forklifts/forklifts.component';
import { ImportComponent } from './components/import/import.component';
import { CommandsComponent } from './components/commands/commands.component';
import { LogsComponent } from './components/logs/logs.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [authGuard], children: [
      { path: '', redirectTo: 'forklifts', pathMatch: 'full' },
      { path: 'forklifts', component: ForkliftsComponent },
      { path: 'import', component: ImportComponent },
      { path: 'commands', component: CommandsComponent },
      { path: 'logs', component: LogsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
