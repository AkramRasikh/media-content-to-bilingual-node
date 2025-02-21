import admin from 'firebase-admin';
import config from '../config';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(config.googleServiceAccount)),
  databaseURL: config.firebaseDBUrl,
});
const bucketName = config.firebaseBucketName;

const uploadBufferToFirebase = async ({
  buffer,
  filePath,
  isVideo = false,
}) => {
  const metadata = {
    contentType: isVideo ? 'video/mp4' : 'audio/mpeg',
  };

  const storage = admin.storage();

  try {
    await storage.bucket(bucketName).file(filePath).save(buffer, {
      metadata: metadata,
    });
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });
    return url;
  } catch (error) {
    console.error('## Error uploading file to firebase:', error);
  }
};

export { uploadBufferToFirebase };
