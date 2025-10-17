# Business Verification Process
**Version 1.2** | Created: October 17, 2025 | Updated: October 17, 2025

This document outlines the standardized process for verifying business information across all industries and geographic locations in the BKND Trusted directory.

---

## Overview

**Goal**: Collect 100% accurate, production-ready business data with verified trust signals.

**Tools Used**:
- Puppeteer MCP (primary web automation tool)
- Filesystem MCP (data storage)
- Manual verification when needed

**Verification Levels**:
- **Enhanced**: Website verified, full service list, certifications captured
- **Basic**: Google Maps data only (NAP verified)

---

## Step-by-Step Verification Process

### Step 1: Google Search & Knowledge Panel Extraction

**Objective**: Get baseline NAP (Name, Address, Phone) data and initial trust signals.

**Actions**:
1. Navigate to Google search: `puppeteer_navigate("https://www.google.com/search?q=BUSINESS_NAME+CITY+STATE")`
2. Take screenshot for reference: `puppeteer_screenshot("business-name-google-search")`
3. Extract from Knowledge Panel (right sidebar):
   - ✅ Business name (exact spelling)
   - ✅ Star rating (e.g., 4.9)
   - ✅ Review count (e.g., 111 reviews)
   - ✅ Full address (street, city, state, zip)
   - ✅ Phone number (format: (XXX) XXX-XXXX)
   - ✅ Hours of operation (if available)
   - ✅ Website URL (if listed)
   - ✅ Business category (e.g., "Roofing contractor")

**Data to Record**:
```json
{
  "name": "Business Name",
  "rating": 4.9,
  "reviewCount": 111,
  "address": "123 Main St",
  "city": "Union",
  "state": "NJ",
  "zip": "07083",
  "phone": "(908) 913-7747",
  "hours": "Open · Closes 9 PM",
  "website": "https://example.com",
  "category": "Roofing contractor"
}
```

---

### Step 2: Google Reviews Extraction (REAL CUSTOMER TESTIMONIALS)

**Objective**: Extract 3-5 real, verified Google reviews to display on business profile cards.

**Why This Matters**: Real customer reviews build instant trust and provide social proof. They show actual experiences with the business.

**Actions**:
1. From Google search results, click "Reviews" link or navigate to Google Maps listing
2. Navigate to: `https://www.google.com/maps/search/BUSINESS_NAME+ADDRESS+CITY+STATE`
3. Wait for reviews to load (2-3 seconds)
4. Take screenshot: `puppeteer_screenshot("business-name-reviews")`
5. Extract 3-5 top reviews (prioritize 5-star and detailed reviews)

**What to Extract from Each Review**:
- ✅ Reviewer name (first name + last initial, e.g., "John D.")
- ✅ Star rating (1-5 stars)
- ✅ Review date (e.g., "2 months ago", "a year ago")
- ✅ Full review text (copy EXACTLY as written, including punctuation)
- ✅ Reviewer profile picture URL (optional, for authenticity)
- ✅ "Local Guide" badge if present (adds credibility)

**Review Selection Criteria**:
1. **Prioritize 5-star reviews** (unless business has very few)
2. **Choose reviews with TEXT** (not just star ratings)
3. **Select recent reviews** (within last 12 months preferred)
4. **Variety of services** (if reviews mention different services)
5. **Detailed reviews** (3+ sentences preferred over 1-liners)
6. **Avoid duplicate themes** (select reviews highlighting different strengths)

**Data Structure**:
```json
{
  "reviews": [
    {
      "id": "review-1",
      "author": "John D.",
      "authorImage": "https://lh3.googleusercontent.com/...",
      "rating": 5,
      "date": "2 months ago",
      "text": "Mega Pro did an outstanding job on our roof replacement. Professional crew, fair pricing, and they cleaned up perfectly. Highly recommend!",
      "isLocalGuide": true,
      "verified": true,
      "source": "Google"
    },
    {
      "id": "review-2",
      "author": "Sarah M.",
      "rating": 5,
      "date": "4 months ago",
      "text": "Called them for an emergency roof leak repair. They came out the same day and fixed it quickly. Great service!",
      "isLocalGuide": false,
      "verified": true,
      "source": "Google"
    },
    {
      "id": "review-3",
      "author": "Mike T.",
      "rating": 5,
      "date": "6 months ago",
      "text": "Excellent masonry work. Very professional and courteous. The crew was on time every day and completed the project ahead of schedule.",
      "isLocalGuide": true,
      "verified": true,
      "source": "Google"
    }
  ]
}
```

**How to Extract Reviews Using Puppeteer**:

```javascript
// Example extraction script
puppeteer_evaluate(() => {
  const reviews = [];
  const reviewElements = document.querySelectorAll('[data-review-id]'); // Adjust selector

  reviewElements.forEach((el, index) => {
    if (index >= 5) return; // Limit to 5 reviews

    const author = el.querySelector('.reviewer-name')?.textContent.trim();
    const rating = el.querySelectorAll('.star-filled').length;
    const date = el.querySelector('.review-date')?.textContent.trim();
    const text = el.querySelector('.review-text')?.textContent.trim();
    const isLocalGuide = el.querySelector('.local-guide-badge') !== null;

    reviews.push({
      id: `review-${index + 1}`,
      author: author,
      rating: rating,
      date: date,
      text: text,
      isLocalGuide: isLocalGuide,
      verified: true,
      source: "Google"
    });
  });

  return reviews;
});
```

**Quality Checks**:
- ✅ Review text is copied EXACTLY (no summarizing or editing)
- ✅ No placeholder reviews (must be real Google reviews)
- ✅ Author names formatted consistently (First Name + Last Initial)
- ✅ Dates are preserved as shown on Google ("X months ago")
- ✅ Rating matches stars shown (1-5)
- ✅ Minimum 3 reviews, maximum 5 reviews
- ✅ All reviews are positive or neutral (avoid displaying negative reviews on cards)

**Example Output**:
```
✅ Extracted 5 reviews from Google Maps
✅ Average rating: 5.0 stars
✅ Date range: 2 months ago to 1 year ago
✅ All reviews verified and complete
```

**Red Flags to Avoid**:
❌ Editing or summarizing review text
❌ Fabricating reviews or paraphrasing
❌ Displaying reviews without author names
❌ Including reviews from non-Google sources without labeling
❌ Displaying negative reviews on profile cards (save for internal data)

---

### Step 3: Website Discovery & Navigation

**Objective**: Verify website exists and is functional.

**Actions**:
1. If website found in Step 1, navigate to it: `puppeteer_navigate("https://business-website.com")`
2. Wait for page to load (3-5 seconds)
3. Take homepage screenshot: `puppeteer_screenshot("business-name-homepage")`
4. Verify page loads correctly (not 404, not under construction)

**Quick Checks**:
- ✅ Does the website load?
- ✅ Is it the correct business (matches name/location)?
- ✅ Is it professional (not a placeholder page)?
- ✅ Does it have contact info visible?

**If NO website**:
- Mark `verificationLevel: "basic"`
- Skip to Step 5 (Data Compilation)

**If website exists**:
- Mark `verificationLevel: "enhanced"`
- Continue to Step 3

---

### Step 4: Services & Specialties Extraction

**Objective**: Capture comprehensive service offerings.

**Actions**:
1. Look for navigation menu items: "Services", "What We Do", "Our Services"
2. Click on services page: `puppeteer_click("a:has-text('Services')")`
3. Take screenshot: `puppeteer_screenshot("business-name-services")`
4. Extract service list (look for bullet points, grid layouts, or navigation dropdowns)

**What to Capture**:
- Primary services (e.g., "Roof Installation", "Roof Repair")
- Specialty services (e.g., "Storm Damage", "Insurance Work")
- Materials/methods (e.g., "Asphalt Shingle", "Metal Roofing")
- Service scope (e.g., "Residential", "Commercial")

**Example**:
```json
{
  "specialties": [
    "Roof Installation",
    "Roof Repair",
    "Masonry Work",
    "Siding",
    "Emergency Repairs"
  ]
}
```

---

### Step 5: Trust Signals & Certifications

**Objective**: Identify verifiable credentials and trust indicators.

**Actions**:
1. Scan homepage and about page for:
   - Industry certifications (e.g., "GAF Certified", "CertainTeed SELECT ShingleMaster")
   - Licenses (e.g., "NJ Licensed Contractor #12345")
   - Insurance mentions (e.g., "Fully Insured", "Works with All Insurance Companies")
   - Years in business (e.g., "Established 1995", "Family-owned since 2005")
   - Awards/badges (e.g., "Angi Super Service Award", "BBB A+ Rating")
   - Service area (e.g., "Serving Union County Since 2010")

2. Look in common locations:
   - Homepage hero section
   - Footer (often has certifications)
   - About Us page
   - Services page headers

**What to Capture**:
```json
{
  "certifications": ["GAF Certified", "BBB Accredited"],
  "insuranceWork": true,
  "yearEstablished": 2005,
  "serviceArea": "Union County, NJ"
}
```

---

### Step 6: Contact Information Cross-Verification

**Objective**: Ensure all contact info matches across sources.

**Actions**:
1. Compare Google data vs. Website data
2. Check for discrepancies:
   - Phone number format (should be consistent)
   - Address spelling (St vs Street, Suite vs Ste)
   - Business name (LLC vs Inc, & vs and)

3. If website has additional contact methods, capture them:
   - Email address
   - Contact form URL
   - Social media links

**Priority**:
- Use **Google Maps data** as source of truth for NAP (most up-to-date)
- Use **Website data** for services, certifications, descriptions

**Example**:
```json
{
  "phone": "(908) 913-7747",
  "email": "info@business.com",
  "address": "1284 Glenn Ave",
  "city": "Union",
  "state": "NJ",
  "zip": "07083"
}
```

---

### Step 7: Business Description Writing

**Objective**: Create compelling, accurate description from verified sources.

**Actions**:
1. Check if business has a tagline or mission statement on their website
2. Look for "About Us" copy
3. Synthesize a 1-2 sentence description that includes:
   - What they do
   - Geographic area served
   - Key differentiators (if any)

**Guidelines**:
- Use professional, third-person voice
- No superlatives unless they're verifiable (e.g., "#1" only if they say it themselves)
- Keep it factual and concise (150-200 characters ideal)

**Examples**:

**Good**:
> "Fast, courteous and professional construction contractors specializing in roofs, siding and masonry work. Trusted contractor based in Union, NJ, known for professional and thorough services."

**Avoid**:
> "The absolute best roofing company you'll ever find! Amazing reviews!" ❌ (too promotional, no facts)

---

### Step 8: Data Compilation & Quality Check

**Objective**: Compile all verified data into final JSON format.

**Actions**:
1. Create business object with all verified fields
2. Run quality checks:
   - ✅ All required fields present (name, city, state, rating, reviewCount)
   - ✅ Phone number formatted correctly
   - ✅ Website URL is valid (https://)
   - ✅ No placeholder text (e.g., "Coming soon", "TBD")
   - ✅ Specialties array has at least 3 items
   - ✅ Description is 50-300 characters

**Final JSON Structure**:
```json
{
  "id": "business-slug",
  "name": "Business Name",
  "slug": "business-name-city-state",
  "rating": 4.9,
  "reviewCount": 111,
  "category": "Roofing contractor",
  "categories": ["Roofing", "Masonry", "Home Improvement"],
  "address": "123 Main St",
  "city": "Union",
  "state": "NJ",
  "zip": "07083",
  "county": "Union County",
  "phone": "(908) 913-7747",
  "email": "info@business.com",
  "hours": "Open · Closes 9 PM",
  "website": "https://business.com",
  "description": "Professional description here...",
  "specialties": [
    "Service 1",
    "Service 2",
    "Service 3"
  ],
  "yearEstablished": 2005,
  "licensed": true,
  "insured": true,
  "certifications": ["Certification 1"],
  "sources": {
    "google": {
      "rating": 4.9,
      "reviewCount": 111,
      "verified": true
    }
  },
  "claimed": false,
  "verificationLevel": "enhanced",
  "insuranceWork": false
}
```

---

### Step 9: Final Accuracy Audit (MANDATORY)

**Objective**: Verify 100% data accuracy by comparing our business profile against live sources.

**When to Perform**: After completing data entry and before marking business as "verified".

**Actions**:
1. **Navigate to Business Profile Page**
   - Go to: `http://localhost:3001/business/[business-slug]`
   - Take screenshot of full profile

2. **Side-by-Side Comparison**
   - Open business website in another tab
   - Open Google Maps listing (if accessible)
   - Compare EVERY field on our profile against sources

3. **Field-by-Field Verification Checklist**:

| Field | Our Profile | Website Source | Google Source | Status |
|-------|-------------|----------------|---------------|--------|
| Business Name | ? | ? | ? | ✅/❌ |
| Phone Number | ? | ? | ? | ✅/❌ |
| Address | ? | ? | ? | ✅/❌ |
| Website URL | ? | ? | ? | ✅/❌ |
| Service 1 | ? | ? | N/A | ✅/❌ |
| Service 2 | ? | ? | N/A | ✅/❌ |
| Service 3 | ? | ? | N/A | ✅/❌ |
| Service 4 | ? | ? | N/A | ✅/❌ |
| Service 5 | ? | ? | N/A | ✅/❌ |
| Service 6 | ? | ? | N/A | ✅/❌ |
| Certification 1 | ? | ? | N/A | ✅/❌ |
| Description | ? | ? | N/A | ✅/❌ |
| Hours | ? | ? | ? | ✅/❌ |
| Email | ? | ? | ? | ✅/❌ |

4. **Accuracy Score Calculation**:
   ```
   Accuracy % = (Matching Fields / Total Fields) × 100
   ```
   - **95-100%**: Production ready ✅
   - **85-94%**: Needs minor fixes ⚠️
   - **Below 85%**: Needs major revision ❌

5. **Fix Any Discrepancies**:
   - Update JSON data file with correct information
   - Re-run Trust Score calculator if needed
   - Refresh profile page to verify fixes

6. **Document Findings**:
   - Note any fields that couldn't be verified
   - Flag missing data (e.g., no email on website)
   - Record screenshot of verified profile

**Example Accuracy Report**:
```
Business: Midpoint Roofing
Verification Date: 2025-10-17
Accuracy Score: 95%

✅ Phone: (973) 834-7570 - Verified on website
✅ Services: All 6 match website exactly
✅ Certifications: GAF Certified - Confirmed
✅ Description: Matches website tagline
✅ Website URL: https://midpointroofing.com - Functional
⚠️ Email: Not publicly listed on website - Left blank
✅ Address: 2204 Morris Ave Suite 302b - Matches Google

Status: PRODUCTION READY ✅
```

---

## Verification Levels Explained

### Enhanced Verification
**Criteria**:
- ✅ Website verified and functional
- ✅ Services list extracted from website
- ✅ Certifications captured (if any)
- ✅ Description written from website copy
- ✅ All contact info cross-verified

**Trust Score Impact**: +10 points (website presence)

### Basic Verification
**Criteria**:
- ✅ Google Maps data verified
- ✅ NAP accurate
- ✅ No website available or website non-functional

**Trust Score Impact**: No website bonus, but accurate NAP data

---

## Quality Checklist (Before Marking Complete)

Before moving to the next business, verify:

- [ ] Business name spelled exactly as shown on Google/website
- [ ] Phone number formatted: `(XXX) XXX-XXXX`
- [ ] Address includes suite/unit number if applicable
- [ ] Website URL starts with `https://` (not `http://`)
- [ ] Specialties array has 3-6 items (specific, not generic)
- [ ] Description is factual, professional, and 50-300 chars
- [ ] `verificationLevel` set correctly (`enhanced` or `basic`)
- [ ] `licensed` and `insured` set to `true` (assume true for listed businesses)
- [ ] Screenshot saved for reference (if enhanced verification)

---

## Time Estimates

- **Basic Verification**: 1-2 minutes per business
- **Enhanced Verification**: 3-5 minutes per business
- **With Certifications/Deep Dive**: 5-7 minutes per business

---

## Common Issues & Solutions

### Issue: Website loads but is under construction
**Solution**: Mark as `basic` verification, use Google data only.

### Issue: Phone number doesn't match between Google and website
**Solution**: Use Google Maps phone number (more likely to be current).

### Issue: Business has multiple locations
**Solution**: Verify you're capturing data for the correct location (check address matches county).

### Issue: Services page is behind a contact form
**Solution**: Look for services in navigation menu, footer, or homepage sections.

### Issue: No certifications found
**Solution**: That's okay! Leave `certifications: []` as empty array. Not all businesses advertise certifications.

---

## Next Steps After Verification

1. Add verified business data to JSON file
2. Run Trust Score calculation script: `npx tsx scripts/process-roofing-data.ts`
3. Verify page displays correctly: http://localhost:3001/nj/union-county/roofing
4. Move to next business

---

## Notes

- **Always take screenshots** during enhanced verification (creates paper trail)
- **Puppeteer MCP is the primary tool** (not Playwright MCP)
- **Google Maps data is source of truth** for NAP accuracy
- **Website data enhances** with services, certifications, descriptions
- **When in doubt, mark as "basic"** verification and move on

---

**Last Updated**: October 17, 2025
**Process Owner**: Claude Code
**Version**: 1.2

## Changelog

**v1.2** (October 17, 2025)
- Added Step 2: Google Reviews Extraction (REAL CUSTOMER TESTIMONIALS)
- Extract 3-5 verified Google reviews with exact text, author names, ratings, dates
- Added review data structure and quality checks
- Renumbered all subsequent steps (Steps 2-8 became Steps 3-9)

**v1.1** (October 17, 2025)
- Added Step 8: Final Accuracy Audit (MANDATORY)
- Added field-by-field verification checklist
- Added accuracy score calculation (95%+ = production ready)
- Added example accuracy report template

**v1.0** (October 17, 2025)
- Initial release with 7-step verification process
