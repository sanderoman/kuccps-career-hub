#!/usr/bin/env python3
"""
Test script to verify all Flask routes are working
"""

from app import create_app
import requests
import json

def test_routes():
    """Test all API routes"""
    app = create_app()
    
    # Test client
    with app.test_client() as client:
        print("🧪 Testing KUCCPS Career Hub API Routes...\n")
        
        # Test root route
        print("1. Testing Root Route (/)")
        try:
            response = client.get('/')
            print(f"   ✅ Status: {response.status_code}")
            print(f"   📄 Response: {json.dumps(response.get_json(), indent=2)}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        print("\n2. Testing Health Check (/api/health)")
        try:
            response = client.get('/api/health')
            print(f"   ✅ Status: {response.status_code}")
            print(f"   📄 Response: {json.dumps(response.get_json(), indent=2)}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        print("\n3. Testing API Info (/api)")
        try:
            response = client.get('/api')
            print(f"   ✅ Status: {response.status_code}")
            print(f"   📄 Response: {json.dumps(response.get_json(), indent=2)}")
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        print("\n4. Testing Auth Routes")
        try:
            response = client.get('/api/auth/health')
            print(f"   ✅ Auth Health Status: {response.status_code}")
            print(f"   📄 Response: {json.dumps(response.get_json(), indent=2)}")
        except Exception as e:
            print(f"   ❌ Auth Health Error: {e}")
        
        print("\n🔍 Route Analysis:")
        for rule in app.url_map.iter_rules():
            print(f"   📍 {rule.rule} -> {rule.endpoint} [{', '.join(rule.methods)}]")
        
        print("\n✅ Route testing completed!")

if __name__ == '__main__':
    test_routes()
