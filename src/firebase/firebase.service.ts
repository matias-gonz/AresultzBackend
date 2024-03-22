import { Injectable } from '@nestjs/common';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { ConfigKeys, ConfigLoader } from 'src/config/config';

export enum FirebaseCollection {
  Teacher = 'Teacher',
  Mentoring = 'Mentoring',
}

@Injectable()
export class FirebaseService {
  private _database: Firestore;

  constructor() {
    initializeApp({
      credential: cert({
        projectId: ConfigLoader.loadConfig(ConfigKeys.FirebaseProjectId),
        privateKey: ConfigLoader.loadConfig(ConfigKeys.FirebasePrivateKey),
        clientEmail: ConfigLoader.loadConfig(ConfigKeys.FirebaseClientEmail),
      }),
    });

    this._database = getFirestore();
  }

  getCollection(collection: string) {
    return this._database.collection(collection);
  }
}
