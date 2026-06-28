export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});

  const { to, toName, subject, html } = req.body;
  if (!to || !subject || !html) return res.status(400).json({error: 'Missing fields'});

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_58nxWcgM_8WhSRuBBHa1UvD9SQpRvitR8'
      },
      body: JSON.stringify({
        from: 'HygiPro <contact@hygi-pro.fr>',
        to: [to],
        reply_to: 'contact@hygi-pro.fr',
        subject: subject,
        html: html
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(400).json({error: data.message || 'Resend error'});
    return res.status(200).json({success: true, id: data.id});
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
}
