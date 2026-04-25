import 'dotenv/config';

let accessToken = null;
let accessTokenExpiresAt = 0;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

async function fetchAccessToken() {
  const now = Date.now();
  if (accessToken && accessTokenExpiresAt > now + 30_000) {
    return accessToken;
  }

  const clientId = requireEnv('PROKERALA_CLIENT_ID');
  const clientSecret = requireEnv('PROKERALA_CLIENT_SECRET');
  const tokenUrl = process.env.PROKERALA_TOKEN_URL || 'https://api.prokerala.com/token';

  const body = new URLSearchParams();
  body.set('grant_type', 'client_credentials');
  body.set('client_id', clientId);
  body.set('client_secret', clientSecret);

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to obtain Prokerala access token (status ${res.status}): ${text}`);
  }

  const json = await res.json();
  if (!json.access_token) {
    throw new Error('Prokerala token response did not include access_token');
  }

  accessToken = json.access_token;
  const expiresInSec = Number(json.expires_in || 3600);
  accessTokenExpiresAt = Date.now() + expiresInSec * 1000;

  return accessToken;
}

const SERVICE_ENDPOINT_ENV = {
  kundali_matching: 'PROKERALA_KUNDALI_MATCHING_PDF_ENDPOINT',
  daily_horoscope: 'PROKERALA_DAILY_HOROSCOPE_PDF_ENDPOINT',
  monthly_horoscope: 'PROKERALA_MONTHLY_HOROSCOPE_PDF_ENDPOINT',
  birth_chart: 'PROKERALA_BIRTH_CHART_PDF_ENDPOINT',
  panchang: 'PROKERALA_PANCHANG_PDF_ENDPOINT',
  dosha_report: 'PROKERALA_DOSHA_REPORT_PDF_ENDPOINT',
};

export async function generateProkeralaPdf(serviceType, formData = {}) {
  const envKey = SERVICE_ENDPOINT_ENV[serviceType];
  if (!envKey) {
    throw new Error(`Unsupported Prokerala service type: ${serviceType}`);
  }
  const endpoint = process.env[envKey];
  if (!endpoint) {
    throw new Error(`Missing environment variable: ${envKey}`);
  }

  const token = await fetchAccessToken();

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/pdf',
    },
    body: JSON.stringify(formData || {}),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Prokerala PDF request failed (status ${res.status}): ${text}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

