# KUCCPS Career Hub - Quick Testing Setup

## 🚀 QUICK START (5 minutes)

### Step 1: Install Node.js
1. Go to https://nodejs.org/ 
2. Download **LTS version** (currently v20.x)
3. Run the installer and follow defaults
4. **Close and reopen PowerShell** after installation

### Step 2: Verify Installation
```powershell
node --version
npm --version
```
Should show something like:
```
v20.10.0
10.2.3
```

### Step 3: Install Dependencies
```powershell
cd c:\kuccps\frontend
npm install
```

### Step 4: Start Development Server
```powershell
npm start
```

Should see output like:
```
Compiled successfully!
On Your Network: http://localhost:3000
```

---

## ✅ TESTING CHECKLIST

Open http://localhost:3000 in your browser and verify:

### Homepage Elements
- [ ] Header displays "KUCCPS Career Hub" with blue background
- [ ] "2024 cutoff points have been incorporated..." message visible
- [ ] **Search Bar** section visible (Google search field)
- [ ] **University Highlights** shows:
  - Top 5 public universities with pictures
  - Top 5 private universities with pictures

### Chatbot Testing
- [ ] Floating chat button (💬) appears bottom-right corner
- [ ] Click button to open chat window
- [ ] Type "hello" → bot responds with greeting
- [ ] Type "help" → bot shows help message
- [ ] Type "support" → bot mentions WhatsApp 0743315353
- [ ] Type random text → bot says "I don't understand"
- [ ] Close button (×) works

### Main Comparison Tool
- [ ] Step buttons (1. Enter Grades, 2. Select Institutions, 3. View Results)
- [ ] Grade input form loads
- [ ] Enter sample grades: C+, B, B, C+, C+, C, C, D+
- [ ] Click "Analyze" button
- [ ] **See 2024 cutoff data** in results

### Cutoff Data Display
- [ ] **2024 Cutoff** column shows values (e.g., 28, 29, 24)
- [ ] **2025 Cutoff** column shows values (e.g., 29, 30)
- [ ] **Your Score** shows calculated cluster points
- [ ] **Gap indicator** shows if eligible (green) or not (red)
- [ ] **Colour scheme** matches professional blue/indigo theme

### Institution Filter
- [ ] Filter by Public/Private institutions
- [ ] Filter by Type (University, Technical College, Diploma)
- [ ] Can see all institutions with codes

### Footer
- [ ] WhatsApp link: 0743315353 → Opens WhatsApp
- [ ] Email visible: support@kuccpscareerhub.dev
- [ ] Professional footer styling

### Responsive Design
- [ ] Open DevTools (F12)
- [ ] Test mobile view (375px width)
- [ ] Components stack vertically
- [ ] Text readable on small screens

---

## 🔧 TROUBLESHOOTING

### Issue: "npm: command not found"
- **Solution**: Close all PowerShell windows and reopen after Node.js install

### Issue: Port 3000 already in use
- **Solution**: 
  ```powershell
  npm start -- --port 3001
  ```

### Issue: Module not found errors
- **Solution**: 
  ```powershell
  cd c:\kuccps\frontend
  rm -r node_modules
  npm install
  npm start
  ```

### Issue: React errors in browser
- **Solution**: Open DevTools (F12) → Console tab → Check error messages

---

## 📊 SAMPLE TEST DATA

If you want to test with realistic grades:

```
Subject          Grade    Points
English          C        6
Mathematics      B+       10
Physics          B        9
Chemistry        B        9
Biology          C+       7
History          C-       5
Computer Science C+       7
CRE              D+       4
─────────────────────────
TOTAL CLUSTER:   57 points
```

This score should be **eligible** for:
- ✅ Most degree programmes (cutoff 24-28)
- ✅ All diploma programmes
- ✅ All certificates

---

## 📝 EXPECTED RESULTS

### Degree Programmes
Should show programmes like:
- University of Nairobi - BSc Computer Science (Cutoff: 28)
- Strathmore - BSc IT (Cutoff: 26)
- Kenyatta - BSc Engineering (Cutoff: 29)

### Diploma Programmes  
Should show programmes like:
- Kenya Technical - Diploma in Electrical (Cutoff: 18)
- Mombasa Technical - Diploma in IT (Cutoff: 19)

### Certificate Programmes
Should show programmes like:
- Kenya Technical - Certificate in Welding (Cutoff: 10)

---

## 🎯 SUCCESS = All Boxes Checked!

Once all items above are verified, the system is working correctly and ready to push to GitHub.

**Need help?** Check the console (F12) for error messages or refer to:
- docs/API_DOCUMENTATION.md
- docs/ARCHITECTURE.md
- FINAL_UPDATES_SUMMARY.md

---

## 🚀 After Testing Pass

Once testing is complete:

1. **Stop the dev server**: Press `Ctrl+C` in terminal
2. **Push to GitHub**: Run `c:\kuccps\push_to_github.ps1`
3. **Deploy to production**: Follow deployment guide in docs

---

**Happy Testing!** 🎉
