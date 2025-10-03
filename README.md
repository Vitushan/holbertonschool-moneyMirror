
git add . && git commit -m "login feature"
git push origin feature/login
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
git clone https://github.com/Vitushan/holbertonschool-moneyMirror.git
docker-compose up -d
# MoneyMirror – Login Feature Branch

This branch focuses on the implementation and testing of the authentication system (login/register) for MoneyMirror.

## Quick Setup

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your DB credentials

# Start development server
npm run dev
```


## Authentication API Usage & Test Examples

### Register a new user (success)
```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name": "John", "email": "john@example.com", "password": "Password123!"}'
# Expected: 201 Created, user registered
```

### Register with missing field (error)
```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email": "john@example.com", "password": "Password123!"}'
# Expected: 400 Bad Request, error: missing name
```

### Register with existing email (error)
```bash
curl -X POST http://localhost:3000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name": "John", "email": "john@example.com", "password": "Password123!"}'
# Expected: 409 Conflict, error: email already taken
```

### Login (success)
```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "john@example.com", "password": "Password123!"}'
# Expected: 200 OK, returns user/session
```

### Login with wrong password (error)
```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "john@example.com", "password": "WrongPass!"}'
# Expected: 401 Unauthorized, error: invalid credentials
```

### Login with unknown email (error)
```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "notfound@example.com", "password": "Password123!"}'
# Expected: 404 Not Found, error: user not found
```

### Login with missing fields (error)
```bash
curl -X POST http://localhost:3000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email": "", "password": ""}'
# Expected: 400 Bad Request, error: missing fields
```

## NextAuth Test Scripts

- `test_nextauth.sh` – Tests NextAuth login/logout/session
- `test_all_api.sh` – Tests custom API endpoints (register/login)

Run:
```bash
./test_nextauth.sh
./test_all_api.sh
# Check result_test_nextauth.txt and result_all_api.txt for outputs
```

## Database Testing

To check users in the database:

```bash
npx prisma studio
# Or in MySQL CLI:
USE moneymirror;
SELECT * FROM User;
```

## Example: Check transactions (if seeded)

```sql
SELECT * FROM Transaction;
```

## Error Handling & Debugging

- Check API responses for error messages and status codes
- Use Prisma Studio to inspect DB state
- Check logs in the terminal for backend errors

## Notes
- This README is specific to the login feature branch.
- For full project documentation, see the README on the development/main branch.

## Database Testing (Optional)

To check users in the database:

```bash
npx prisma studio
# Or in MySQL CLI:
USE moneymirror;
SELECT * FROM User;
```

## Auth Test Scripts

- `test_nextauth.sh` – Tests NextAuth login/logout/session
- `test_all_api.sh` – Tests custom API endpoints (register/login)

Run:
```bash
./test_nextauth.sh
./test_all_api.sh
```

## Notes
- This README is specific to the login feature branch.
- For full project documentation, see the README on the development/main branch.
