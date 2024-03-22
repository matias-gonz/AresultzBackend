import { Subject } from 'src/teacher/teacher.model';

export type Mentoring = {
  acceptedAt?: string;
  available: boolean;
  contactEmail: string;
  createdAt: string;
  description?: string;
  scheduledFor?: string;
  subject: Subject;
  teacher?: string;
};
