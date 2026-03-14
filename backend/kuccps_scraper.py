"""
KUCCPS Live Database Scraper & API Service
Automatically fetches and caches programmes from official KUCCPS website
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime, timedelta
import logging
import urllib3

# Suppress SSL warnings (development only)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Cache configuration
CACHE_FILE = os.path.join(os.path.dirname(__file__), 'kuccps_programmes_cache.json')
CACHE_DURATION = timedelta(hours=24)  # Refresh cache every 24 hours

# Official KUCCPS URL
KUCCPS_URL = "https://students.kuccps.ac.ke/programmes/"

class KUCCPSScraper:
    """Scrapes and manages KUCCPS programmes database"""
    
    def __init__(self):
        self.programmes = []
        self.last_updated = None
        self.load_cache()
    
    def load_cache(self):
        """Load programmes from cache if available"""
        if os.path.exists(CACHE_FILE):
            try:
                with open(CACHE_FILE, 'r') as f:
                    cache_data = json.load(f)
                    self.programmes = cache_data.get('programmes', [])
                    self.last_updated = cache_data.get('last_updated')
                    logger.info(f"Loaded {len(self.programmes)} programmes from cache")
                    return True
            except Exception as e:
                logger.warning(f"Could not load cache: {e}")
        return False
    
    def save_cache(self):
        """Save programmes to cache file"""
        try:
            with open(CACHE_FILE, 'w') as f:
                json.dump({
                    'programmes': self.programmes,
                    'last_updated': datetime.now().isoformat()
                }, f, indent=2)
            self.last_updated = datetime.now().isoformat()
            logger.info(f"Cached {len(self.programmes)} programmes")
        except Exception as e:
            logger.error(f"Could not save cache: {e}")
    
    def should_refresh_cache(self):
        """Check if cache needs refresh"""
        if not self.last_updated:
            return True
        
        try:
            last_update = datetime.fromisoformat(self.last_updated)
            if datetime.now() - last_update > CACHE_DURATION:
                return True
        except:
            pass
        return False
    
    def scrape_kuccps(self):
        """Scrape official KUCCPS website for programmes"""
        try:
            logger.info("Scraping KUCCPS website...")
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(KUCCPS_URL, headers=headers, timeout=10, verify=False)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            programmes = []
            
            # Parse table rows
            rows = soup.find_all('tr')
            logger.info(f"Found {len(rows)} rows in KUCCPS table")
            
            for row in rows[1:]:  # Skip header row
                try:
                    columns = row.find_all('td')
                    
                    if len(columns) >= 4:
                        programme = {
                            'name': columns[0].text.strip(),
                            'institution': columns[1].text.strip(),
                            'level': columns[2].text.strip(),
                            'requirement': columns[3].text.strip(),
                            'cluster_subjects': columns[4].text.strip() if len(columns) > 4 else '',
                            'career_field': columns[5].text.strip() if len(columns) > 5 else '',
                            'id': hash(columns[0].text.strip())
                        }
                        
                        # Validate programme data
                        if programme['name'] and programme['institution']:
                            programmes.append(programme)
                except Exception as e:
                    logger.warning(f"Could not parse row: {e}")
                    continue
            
            if programmes:
                self.programmes = programmes
                self.save_cache()
                logger.info(f"Successfully scraped {len(programmes)} programmes")
                return True
            else:
                logger.warning("No programmes found in scrape")
                return False
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to scrape KUCCPS: {e}")
            return False
    
    def get_programmes(self, force_refresh=False):
        """Get programmes, refreshing from web if needed"""
        # Refresh if cache is old or if forced
        if force_refresh or self.should_refresh_cache():
            if self.scrape_kuccps():
                return self.programmes
            # If scraping fails, return cached data
            elif self.programmes:
                logger.info("Scraping failed, using cached data")
                return self.programmes
            else:
                logger.error("No programmes available")
                return []
        
        return self.programmes if self.programmes else self.get_programmes(force_refresh=True)

# Initialize scraper
scraper = KUCCPSScraper()

@app.route('/api/programmes', methods=['GET'])
def get_programmes():
    """Get all programmes"""
    force_refresh = request.args.get('refresh', 'false').lower() == 'true'
    programmes = scraper.get_programmes(force_refresh=force_refresh)
    
    return jsonify({
        'success': True,
        'count': len(programmes),
        'programmes': programmes,
        'last_updated': scraper.last_updated
    })

@app.route('/api/programmes/search', methods=['POST'])
def search_programmes():
    """Search and filter programmes"""
    data = request.json or {}
    
    mean_grade = data.get('meanGrade', '').strip()
    grades = data.get('grades', {})
    interests = data.get('interests', [])
    
    programmes = scraper.get_programmes()
    
    # Grade hierarchy for comparison
    grade_hierarchy = {
        'A': 12, 'A-': 11, 'B+': 10, 'B': 9, 'B-': 8,
        'C+': 7, 'C': 6, 'C-': 5, 'D+': 4, 'D': 3, 'D-': 2, 'E': 1
    }
    
    filtered = []
    
    for programme in programmes:
        # Get programme minimum requirement
        prog_min = programme.get('requirement', '').strip()
        
        # Check if student meets minimum grade
        if mean_grade in grade_hierarchy and prog_min in grade_hierarchy:
            if grade_hierarchy[mean_grade] >= grade_hierarchy[prog_min]:
                
                # Apply interest filter if specified
                if interests:
                    career_field = programme.get('career_field', '').lower()
                    if any(interest.lower() in career_field for interest in interests):
                        filtered.append(programme)
                else:
                    filtered.append(programme)
        
    # Sort by level: Degree > Diploma > Certificate
    level_order = {'Degree': 0, 'Diploma': 1, 'Certificate': 2}
    filtered.sort(key=lambda x: level_order.get(x.get('level', ''), 99))
    
    return jsonify({
        'success': True,
        'count': len(filtered),
        'programmes': filtered
    })

@app.route('/api/status', methods=['GET'])
def status():
    """Get API status and cache info"""
    programmes = scraper.get_programmes()
    
    return jsonify({
        'status': 'online',
        'programmes_loaded': len(programmes),
        'last_updated': scraper.last_updated,
        'cache_file': CACHE_FILE
    })

@app.route('/api/refresh', methods=['POST'])
def refresh():
    """Force refresh of programmes database"""
    success = scraper.scrape_kuccps()
    
    return jsonify({
        'success': success,
        'programmes_loaded': len(scraper.programmes),
        'message': 'Database refreshed successfully' if success else 'Failed to refresh database'
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'KUCCPS Programme Scraper API',
        'version': '1.0'
    })

if __name__ == '__main__':
    # Load programmes on startup
    logger.info("Starting KUCCPS Programme Scraper API...")
    scraper.get_programmes()
    
    # Run Flask app
    app.run(host='0.0.0.0', port=5000, debug=False)
