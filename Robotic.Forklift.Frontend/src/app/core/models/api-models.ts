export interface LoginRequest { username?: string; password?: string; }

export interface LoginResponse { token?: string; expiresAt: string; }

export interface ParsedActionDto { action?: string; value: number; unit?: string; }

export interface ForkliftDto {
  id: number; name?: string; modelNumber?: string; manufacturingDate: string;
}

export interface ImportResultDto { inserted: number; skipped: number; errors?: string[]; }

export interface SendCommandRequest { forkliftId: number; command?: string; issuedByUserId: number; }

export interface FolkliftCommandDto {
  id: number; forkliftId: number; command?: string;
  parsedActions?: ParsedActionDto[]; createdAt: string; issuedBy?: string;
}