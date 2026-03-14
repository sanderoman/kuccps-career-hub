# 🚀 QUICK START: Live KUCCPS Database Scraper

## 5-Minute Setup

### **Terminal 1: Frontend (Already running)**
```bash
# Port 3000 - React app
# Should already be running from: npm start
```

### **Terminal 2: Backend Scraper (NEW)**
```bash
# Step 1: Install Python packages
cd c:\kuccps\backend
pip install -r requirements.txt

# Step 2: Start the scraper API
python kuccps_scraper.py

# Expected Output:
# ✅ Starting KUCCPS Programme Scraper API...
# ✅ Successfully scraped 1000+ programmes
# ✅ Running on http://0.0.0.0:5000
```

### **Step 3: Verify Everything Works**
```bash
# Terminal 3: Test API
curl http://localhost:5000/health

# Should return:
# {"status":"healthy","service":"KUCCPS Programme Scraper API","version":"1.0"}
```

## 🎯 That's It!

The React frontend will **automatically**:
- ✅ Detect API on port 5000
- ✅ Use live KUCCPS data
- ✅ Show 🔴 LIVE indicator
- ✅ Fall back to local DB if API unavailable

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| `Address already in use` | `netstat -ano \| findstr :5000` then kill PID |
| `API returns 404` | Ensure `python kuccps_scraper.py` running |
| Shows "LOCAL" instead of "LIVE" | API not responding - check firewall |
| `No programmes found` | KUCCPS website changed - check HTML structure |

---

## 📊 What Each Service Does

```
Frontend (port 3000)
├─ Shows results to students
├─ Accepts KCSE grades
└─ Filters by interests

Backend (port 5000)
├─ Scrapes KUCCPS website
├─ Caches data (24 hours)
└─ Serves 1000+ programmes via API
```

---

## 🔄 How It Works

```
Result Page Loaded
    ↓
Try to fetch from port 5000 API
    ├─ SUCCESS: Use 1000+ live KUCCPS programmes
    ├─ FAIL: Use 100+ local fallback database
    ↓
Generate recommendations
    ↓
Show results with data source indicator
```

---

## 📁 Key Files

```
backend/
├── kuccps_scraper.py      (NEW - Flask API + Scraper)
├── kuccps_programmes_cache.json  (NEW - Cached data, auto-updated)
└── requirements.txt        (Updated with bs4 + lxml)

frontend/
├── src/services/courseRecommendationEngine.js  (Enhanced with API)
└── src/components/AdvancedCourseResults.jsx    (Shows data source)
```

---

## 🗂️ Documentation

**For Setup:** Read `docs/LIVE_SCRAPER_SETUP_GUIDE.md`
**For Technical Details:** Read `LIVE_SCRAPER_IMPLEMENTATION.md`
**For API:** See endpoints in LIVE_SCRAPER_SETUP_GUIDE.md

---

## ✅ Checklist

- [ ] Installed Python packages: `pip install -r requirements.txt`
- [ ] Scraper running: `python kuccps_scraper.py`
- [ ] API responds: `curl http://localhost:5000/health`
- [ ] Frontend showing 🔴 LIVE indicator on Results Page
- [ ] Programmes loading from API (check terminal for success message)

---

## 🎓 Example Test

```bash
# 1. Start scraper
cd c:\kuccps\backend && python kuccps_scraper.py

# 2. In new terminal, check status
curl http://localhost:5000/api/status

# 3. Get all programmes
curl http://localhost:5000/api/programmes | jq '.count'

# 4. Search programmes
curl -X POST http://localhost:5000/api/programmes/search \
  -H "Content-Type: application/json" \
  -d '{"meanGrade":"C+","grades":{"Math":"C+","Biology":"B-"},"interests":["Health"]}'
```

---

**Status:** Everything integrated and ready! 🎉

