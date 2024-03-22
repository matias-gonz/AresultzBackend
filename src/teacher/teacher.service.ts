import { Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';
import { Subject, Teacher } from './teacher.model';

@Injectable()
export class TeacherService {
  private _teachers: CollectionReference;

  async asyncGetTeachersBySubject(subject: Subject): Promise<Teacher[]> {
    const query = await this._teachers
      .where('subjects', 'array-contains', subject.toString())
      .get();
    return query.docs.map((doc) => ({ ...doc.data() })) as Teacher[];
  }

  async asyncGetTeachers(limit = 5): Promise<Teacher[]> {
    const query = await this._teachers.limit(limit).get();

    return query.docs.map((doc) => ({
      ...doc.data(),
    })) as Teacher[];
  }
}
