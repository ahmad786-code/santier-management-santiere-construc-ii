export type SiteStatus = 'pe_santier' | 'in_asteptare' | 'problema';

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

export interface ActivityEvent {
  id: string;
  time: string;
  description: string;
  author?: string;
  type: 'check_in' | 'task' | 'photo' | 'report' | 'milestone';
}

export interface SitePhoto {
  id: string;
  url: string;
  time: string;
  date: string;
  author: string;
  note: string;
  isNew?: boolean;
}

export interface DailyReport {
  submitted: boolean;
  submittedAt?: string;
  author?: string;
  lucrariEfectuate: string;
  materialeNecesare: string;
  probleme: string;
  observatii: string;
}

export interface ConstructionSite {
  id: string;
  name: string;
  city: string;
  responsabil: string;
  status: SiteStatus;
  statusText: string;
  ultimaActualizare: string;
  echipa: number;
  checkInTime: string | null;
  isCheckedIn: boolean;
  activities: ActivityEvent[];
  tasks: TaskItem[];
  photos: SitePhoto[];
  dailyReport: DailyReport;
}
