export default async function handler(req, res) {
  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cookie');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, cookie } = req.body || req.query;

  if (!url || !cookie) {
    return res.status(400).json({ error: 'Thiếu url hoặc cookie' });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
