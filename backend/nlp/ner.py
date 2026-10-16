"""
Indian Geographic and Environmental Named Entity Recognition Module.
Uses rule-based patterns and spaCy gazetteer for Indian states, districts, landmarks, and rivers.
"""

import re
from typing import Dict, List, Any

# Indian States and Union Territories with major districts
INDIAN_GEO_GAZETTEER = {
    "Delhi": ["East Delhi", "West Delhi", "North Delhi", "South Delhi", "Central Delhi", "New Delhi", "Shahdara"],
    "Karnataka": ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Dharwad", "Dakshina Kannada", "Tumakuru", "Udupi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Erode", "Cuddalore", "Tirunelveli"],
    "Maharashtra": ["Mumbai City", "Mumbai Suburban", "Pune", "Thane", "Nagpur", "Nashik", "Navi Mumbai"],
    "Uttar Pradesh": ["Kanpur Nagar", "Varanasi", "Lucknow", "Ghaziabad", "Agra", "Noida", "Prayagraj", "Meerut"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Valsad", "Vapi", "Bharuch"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Sangrur", "Patiala", "Bathinda"],
    "Haryana": ["Gurugram", "Faridabad", "Karnal", "Panipat", "Sonipat", "Ambala"],
    "West Bengal": ["Kolkata", "Howrah", "North 24 Parganas", "South 24 Parganas", "Hooghly"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Pali", "Kota", "Alwar", "Udaipur", "Bhilwara"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
    "Telangana": ["Hyderabad", "Warangal", "Medchal-Malkajgiri", "Rangareddy"],
    "Assam": ["Guwahati", "Kamrup Metropolitan", "Dibrugarh", "Jorhat"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Singrauli", "Jabalpur", "Gwalior"],
}

KNOWN_INDIAN_HOTSPOTS = [
    "Bellandur Lake",
    "Varthur Lake",
    "Yamuna River",
    "Ganga River",
    "Cooum River",
    "Najafgarh Drain",
    "Ghazipur Landfill",
    "Deonar Dumping Ground",
    "Anand Vihar",
    "Singrauli Industrial Area",
    "Vapi GIDC",
    "Ennore Creek",
    "Deepor Beel",
    "Dal Lake",
    "Rushikonda Beach",
    "Hussain Sagar Lake"
]

LOCALITY_PATTERNS = re.compile(
    r"\b([A-Za-z0-9\-]+(?:\s+[A-Za-z0-9\-]+)?)\s+(lake|river|ghat|drain|nallah|dumpyard|landfill|bridge|circle|chowk|marg|road|sector|nagar|vihar|colony|layout|beach|creek|forest|industrial area|gidc|midc)\b",
    re.IGNORECASE
)


def extract_indian_locations_py(text: str) -> Dict[str, Any]:
    """
    Extracts Indian geographic entities from complaint text.
    Distinguishes user-provided locations from NLP-extracted mentions.
    """
    lower = text.lower()
    raw_mentions: List[str] = []
    detected_state = None
    detected_district = None
    detected_locality = None

    # 1. Match known environmental hotspots
    for hotspot in KNOWN_INDIAN_HOTSPOTS:
        if hotspot.lower() in lower:
            raw_mentions.append(hotspot)
            if not detected_locality:
                detected_locality = hotspot

    # 2. Match States and Districts
    for state, districts in INDIAN_GEO_GAZETTEER.items():
        if state.lower() in lower:
            raw_mentions.append(state)
            if not detected_state:
                detected_state = state

        for dist in districts:
            if dist.lower() in lower:
                raw_mentions.append(f"{dist} ({state})")
                if not detected_district:
                    detected_district = dist
                    if not detected_state:
                        detected_state = state

    # 3. Match locality suffix patterns
    for match in LOCALITY_PATTERNS.finditer(text):
        loc = match.group(0).strip()
        if not any(loc.lower() in m.lower() for m in raw_mentions):
            raw_mentions.append(loc)
            if not detected_locality:
                detected_locality = loc

    return {
        "state": detected_state,
        "district": detected_district,
        "locality_or_landmark": detected_locality,
        "raw_mentions": list(set(raw_mentions))
    }
