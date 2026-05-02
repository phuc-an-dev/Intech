#!/usr/bin/env python3
"""
Generate topics.csv and courses.csv from src/data/courses.ts + git EN translations.
Run from project root: python3 scripts/generate-sheet-csv.py
Output: scripts/topics.csv and scripts/courses.csv
"""

import csv
import json
import re
import subprocess
import sys
import os

# ─── Load EN translations from git commit ───────────────────────────────────

def load_en_data():
    result = subprocess.run(
        ["git", "show", "0b8ee38:messages/en.json"],
        capture_output=True, text=True, encoding="utf-8"
    )
    if result.returncode != 0:
        print("Warning: could not load EN translations from git. Using VI as fallback.")
        return {}, {}
    d = json.loads(result.stdout)
    data = d.get("data", {})
    return data.get("topics", {}), data.get("courses", {})

en_topics, en_courses = load_en_data()

# ─── Parse courses.ts ────────────────────────────────────────────────────────

def read_ts():
    path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "courses.ts")
    with open(path, encoding="utf-8") as f:
        return f.read()

content = read_ts()

# Extract string field value from TS object text
def get_field(obj_text, field):
    pat = rf'{field}\s*:\s*"((?:[^"\\]|\\.)*)"'
    m = re.search(pat, obj_text)
    if m:
        return m.group(1).replace('\\"', '"').replace("\\n", "\n").replace("\\'", "'")
    parts = re.findall(rf'{field}\s*:\s*"((?:[^"\\]|\\.)*)"', obj_text)
    return parts[0] if parts else ""

def get_number(obj_text, field):
    m = re.search(rf'{field}\s*:\s*([\d_]+)', obj_text)
    if m:
        return int(m.group(1).replace("_", ""))
    return 0

def get_tags(obj_text):
    m = re.search(r'tags\s*:\s*\[(.*?)\]', obj_text, re.DOTALL)
    if not m:
        return []
    raw = m.group(1)
    return [t.strip().strip('"') for t in re.findall(r'"([^"]*)"', raw)]

def get_prerequisite(obj_text):
    m = re.search(r'prerequisite\s*:\s*"([^"]*)"', obj_text)
    return m.group(1) if m else ""

# ─── Parse topics ────────────────────────────────────────────────────────────

topics_match = re.search(r'export const topics.*?=\s*\[(.*?)\];', content, re.DOTALL)
if not topics_match:
    print("ERROR: could not find topics array in courses.ts")
    sys.exit(1)

topics_raw = topics_match.group(1)
topic_objects = re.findall(r'\{([^{}]*)\}', topics_raw, re.DOTALL)

topics = []
for obj in topic_objects:
    slug = get_field(obj, "slug")
    if not slug:
        continue
    name_vi = get_field(obj, "name")
    desc_vi = get_field(obj, "description")
    en_t = en_topics.get(slug, {})
    name_en = en_t.get("name", name_vi)
    desc_en = en_t.get("description", desc_vi)
    topics.append({
        "slug": slug,
        "name_vi": name_vi,
        "name_en": name_en,
        "description_vi": desc_vi,
        "description_en": desc_en,
    })

# ─── Parse courses ───────────────────────────────────────────────────────────

courses_match = re.search(r'export const courses.*?=\s*\[(.*)\];', content, re.DOTALL)
if not courses_match:
    print("ERROR: could not find courses array in courses.ts")
    sys.exit(1)

courses_raw = courses_match.group(1)

# Use bracket counting to correctly split top-level objects (handles nested duration:{})
def split_top_level_objects(text):
    objects = []
    depth = 0
    start = None
    for i, ch in enumerate(text):
        if ch == '{':
            if depth == 0:
                start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start is not None:
                objects.append(text[start+1:i])
                start = None
    return objects

course_objects = split_top_level_objects(courses_raw)

VALID_LEVELS = {"foundation", "tools", "application", "advanced", "strategic"}

courses = []
errors = []

for i, obj in enumerate(course_objects):
    course_id = get_field(obj, "id")
    if not course_id:
        continue
    slug = get_field(obj, "slug")
    title_vi = get_field(obj, "title")
    desc_vi = get_field(obj, "description")
    topic_slug = get_field(obj, "topicSlug")
    level = get_field(obj, "level")
    price_original = get_number(obj, "price")
    tags = get_tags(obj)
    outcome_vi = get_field(obj, "learningOutcome")
    prereq = get_prerequisite(obj)

    # duration
    dur_match = re.search(r'duration\s*:\s*\{[^}]*hours\s*:\s*(\d+)[^}]*sessions\s*:\s*(\d+)', obj, re.DOTALL)
    if not dur_match:
        dur_match = re.search(r'duration\s*:\s*\{[^}]*sessions\s*:\s*(\d+)[^}]*hours\s*:\s*(\d+)', obj, re.DOTALL)
        hours = int(dur_match.group(2)) if dur_match else 0
        sessions = int(dur_match.group(1)) if dur_match else 0
    else:
        hours = int(dur_match.group(1))
        sessions = int(dur_match.group(2))

    # Validation
    if level not in VALID_LEVELS:
        errors.append(f"  [WARN] {slug}: invalid level '{level}'")
    if price_original <= 0:
        errors.append(f"  [WARN] {slug}: price is 0")
    if prereq and not any(c.get("slug") == prereq for c in courses):
        # check if prereq exists (will be checked after all courses parsed)
        pass

    en_c = en_courses.get(course_id, {})
    title_en = en_c.get("title", title_vi)
    desc_en = en_c.get("description", desc_vi)
    outcome_en = en_c.get("learningOutcome", outcome_vi)

    # Clean EN prefix if somehow still present
    for k in ["title_en", "desc_en", "outcome_en"]:
        val = locals()[k]
        if val.startswith("[EN] "):
            locals()[k]  # just reference, replaced below
    title_en = title_en.lstrip("[EN] ") if title_en.startswith("[EN]") else title_en
    desc_en = desc_en.lstrip("[EN] ") if desc_en.startswith("[EN]") else desc_en
    outcome_en = outcome_en.lstrip("[EN] ") if outcome_en.startswith("[EN]") else outcome_en

    courses.append({
        "slug": slug,
        "topic_slug": topic_slug,
        "status": "published",
        "level": level,
        "duration_hours": hours,
        "duration_sessions": sessions,
        "title_vi": title_vi,
        "title_en": title_en,
        "description_vi": desc_vi,
        "description_en": desc_en,
        "tags": ",".join(tags),
        "learning_outcome_vi": outcome_vi,
        "learning_outcome_en": outcome_en,
        "price_original": price_original,
        "price_sale": "",
        "prerequisite": prereq,
    })

# Validate prerequisites
all_slugs = {c["slug"] for c in courses}
for c in courses:
    if c["prerequisite"] and c["prerequisite"] not in all_slugs:
        errors.append(f"  [WARN] {c['slug']}: prerequisite '{c['prerequisite']}' not found")

# ─── Write CSV ───────────────────────────────────────────────────────────────

out_dir = os.path.dirname(__file__)

topics_path = os.path.join(out_dir, "topics.csv")
with open(topics_path, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["slug","name_vi","name_en","description_vi","description_en"])
    w.writeheader()
    w.writerows(topics)

courses_path = os.path.join(out_dir, "courses.csv")
fieldnames = ["slug","topic_slug","status","level","duration_hours","duration_sessions",
              "title_vi","title_en","description_vi","description_en","tags",
              "learning_outcome_vi","learning_outcome_en","price_original","price_sale","prerequisite"]
with open(courses_path, "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=fieldnames)
    w.writeheader()
    w.writerows(courses)

# ─── Report ──────────────────────────────────────────────────────────────────

print(f"✓ topics.csv   → {len(topics)} rows  ({topics_path})")
print(f"✓ courses.csv  → {len(courses)} rows  ({courses_path})")

if errors:
    print("\nValidation warnings:")
    for e in errors:
        print(e)
else:
    print("\nValidation: OK — no issues found")
