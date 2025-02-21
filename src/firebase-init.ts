import admin from 'firebase-admin';
import config from '../config';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(config.googleServiceAccount)),
  databaseURL: config.firebaseDBUrl,
});

export const db = admin.database();
