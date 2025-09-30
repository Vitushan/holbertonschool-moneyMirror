#!/bin/zsh

# --- NEXTAUTH TESTS ---
echo ""
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
