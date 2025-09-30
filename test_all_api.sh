#!/bin/zsh

# --- NEXTAUTH TESTS ---
echo "=== 1. NEXTAUTH LOGIN OK ==="
curl -c cookies.txt -s http://localhost:3000/api/auth/signin | grep 'name="csrfToken"' | sed -n 's/.*value="\([^"]*\)".*/\1/p' > csrf.txt
CSRF=$(cat csrf.txt)
curl -b cookies.txt -c cookies.txt -X POST "http://localhost:3000/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=jean@example.com&password=password123&csrfToken=$CSRF" -v

echo ""
echo "=== 2. NEXTAUTH LOGIN WRONG PASSWORD ==="
curl -c cookies.txt -s http://localhost:3000/api/auth/signin | grep 'name="csrfToken"' | sed -n 's/.*value="\([^"]*\)".*/\1/p' > csrf.txt
CSRF=$(cat csrf.txt)
curl -b cookies.txt -c cookies.txt -X POST "http://localhost:3000/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=jean@example.com&password=badpassword&csrfToken=$CSRF" -v

echo ""
echo "=== 3. NEXTAUTH LOGIN UNKNOWN EMAIL ==="
curl -c cookies.txt -s http://localhost:3000/api/auth/signin | grep 'name="csrfToken"' | sed -n 's/.*value="\([^"]*\)".*/\1/p' > csrf.txt
CSRF=$(cat csrf.txt)
curl -b cookies.txt -c cookies.txt -X POST "http://localhost:3000/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=unknown@example.com&password=password123&csrfToken=$CSRF" -v

echo ""
echo "=== 4. NEXTAUTH LOGIN WITHOUT CSRF TOKEN ==="
curl -b cookies.txt -c cookies.txt -X POST "http://localhost:3000/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=jean@example.com&password=password123" -v

echo ""
echo "=== 5. NEXTAUTH LOGIN WITHOUT COOKIES ==="
curl -X POST "http://localhost:3000/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=jean@example.com&password=password123&csrfToken=$CSRF" -v

echo ""
echo "=== 6. NEXTAUTH SESSION ==="
curl -b cookies.txt http://localhost:3000/api/auth/session -v

echo ""
echo "=== 7. NEXTAUTH LOGOUT ==="
curl -b cookies.txt -c cookies.txt -s http://localhost:3000/api/auth/signout | grep 'name="csrfToken"' | sed -n 's/.*value="\([^"]*\)".*/\1/p' > csrf.txt
CSRF=$(cat csrf.txt)
curl -b cookies.txt -c cookies.txt -X POST "http://localhost:3000/api/auth/signout" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfToken=$CSRF" -v

# --- CUSTOM API TESTS ---
echo ""
echo "=== 8. API REGISTER OK ==="
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test API", "email": "testapi@example.com", "password": "password123"}' -v

echo ""
echo "=== 9. API REGISTER EMAIL ALREADY TAKEN ==="
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test API", "email": "testapi@example.com", "password": "password123"}' -v

echo ""
echo "=== 10. API LOGIN OK ==="
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testapi@example.com", "password": "password123"}' -v

echo ""
echo "=== 11. API LOGIN WRONG PASSWORD ==="
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testapi@example.com", "password": "badpassword"}' -v

echo ""
echo "=== 12. API LOGIN UNKNOWN EMAIL ==="
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "unknown@example.com", "password": "password123"}' -v

echo ""
echo "=== 13. API LOGIN MISSING FIELDS ==="
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "", "password": ""}' -v
