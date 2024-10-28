import express from 'express';
import webpush from 'web-push';
import bodyParser from 'body-parser';
import cors from 'cors';  // Import the CORS package

const app = express();
app.use(cors());  // Use the CORS middleware
app.use(bodyParser.json());

const vapidKeys = {
  publicKey: 'BGCPPq6d0kzufTZlPwsWyTR_7Mv5uCe5lPQOAAyO6t7H5_PqbyvGCUb2br-GpbtUmlYTClJnCuLwg7LK5sc2e10',
  privateKey: 'cMsltUJ1rsTB9HkpCs_33KLDICIrsA908bWe4qfFM_M'
};

webpush.setVapidDetails(
  'mailto:sammiecashiyanu@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'Hello!', body: 'This is a push notification.' });

  webpush.sendNotification(subscription, payload).catch(error => console.error(error));
});

const port = 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
