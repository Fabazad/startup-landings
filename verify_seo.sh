#!/bin/bash
echo "Testing Envy..."
curl -s -H "Host: envy.com" http://localhost:8082 | grep -o '<title>.*</title>'
curl -s -H "Host: envy.com" http://localhost:8082 | grep 'rel="icon"'

echo "Testing Viby..."
curl -s -H "Host: viby.com" http://localhost:8082 | grep -o '<title>.*</title>'
curl -s -H "Host: viby.com" http://localhost:8082 | grep 'rel="icon"'

echo "Testing WWW Viby (Fix Verification)..."
curl -s -H "Host: www.viby.com" http://localhost:8082 | grep -o '<title>.*</title>'
