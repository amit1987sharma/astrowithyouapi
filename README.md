# astroapi (Astrologger backend)

Node.js + Express + MySQL (Sequelize) backend for your DB `ast`.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install and run:

```bash
npm install
npm start
```

Server runs on: `http://localhost:<SERVER_PORT>`

## API Routes

### Auth APIs (JWT)
- `POST /api/auth/register` (body: `name,email,password,phone,role?`)
- `POST /api/auth/login` (body: `email,password`)
- `GET /api/auth/me` (Bearer token)

### User APIs
- `GET /api/users/me` (Bearer token)
- `PUT /api/users/me` (Bearer token; body: `name?,phone?`)

### Astrologer APIs
- `GET /api/astrologers` (public)
- `GET /api/astrologers/:id` (public)
- `POST /api/astrologers/me` (Bearer token; create/update profile)
- `PUT /api/astrologers/me` (Bearer token; create/update profile)

### Booking APIs
- `POST /api/bookings` (Bearer token; body: `astrologer_id,booking_date,booking_time`)
- `GET /api/bookings/my` (Bearer token; user sees own, astrologer sees assigned)
- `PATCH /api/bookings/:id/status` (Bearer token; body: `status`)

### Payment APIs
- `POST /api/payments` (Bearer token; body: `booking_id,amount,payment_method?,payment_status`)
- `GET /api/payments/my` (Bearer token)

### Admin APIs (role: admin)
- `GET /api/admin/users`
- `GET /api/admin/astrologers`
- `PATCH /api/admin/astrologers/:id/verify` (body: `is_verified`)
- `GET /api/admin/bookings`
- `GET /api/admin/payments`

### Horoscope APIs
- `GET /api/horoscopes` (public)
- `GET /api/horoscopes/:zodiac_sign` (public)
- `POST /api/horoscopes` (admin)
- `PUT /api/horoscopes/:id` (admin)

### Report APIs
- `GET /api/reports/my` (Bearer token)
- `POST /api/reports` (Bearer token; body: `type,report_url?`)

