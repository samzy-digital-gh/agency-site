const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Scheduled function runs once per day
exports.deleteOldVideos = functions.pubsub.schedule('0 0 * * *').timeZone('UTC').onRun(async (context) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7); // 7 days ago
  
  const postsSnapshot = await db.collection('posts')
    .where('mediaType', '==', 'video')
    .where('createdAt', '<', cutoff)
    .get();
  
  const deletePromises = [];
  postsSnapshot.forEach(doc => {
    const post = doc.data();
    if (post.mediaURL) {
      // Extract file path from URL
      const filePath = decodeURIComponent(post.mediaURL.split('/o/')[1].split('?')[0]);
      const file = bucket.file(filePath);
      deletePromises.push(file.delete().catch(err => console.log('File delete error:', err)));
    }
    // Optionally delete the post or just clear mediaURL
    // Here we delete the whole post document
    deletePromises.push(doc.ref.delete());
  });
  
  await Promise.all(deletePromises);
  console.log(`Deleted ${postsSnapshot.size} old video posts.`);
  return null;
}); 