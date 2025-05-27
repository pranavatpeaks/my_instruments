import { google } from 'googleapis';

export default async function POST(req, res) {

  const { name, email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.SPREADSHEET_ID;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, new Date().toLocaleString()]],
      },
    });

    return res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('Error adding to sheet:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
