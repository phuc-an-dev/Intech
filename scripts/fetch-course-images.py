#!/usr/bin/env python3
"""
Download course thumbnail images from Unsplash and save WebP files to public/images/.
Usage: python3 scripts/fetch-course-images.py
"""

import urllib.request
import urllib.parse
import json
import subprocess
import os
import time

ACCESS_KEY = "a6QIMtAKsbqarzP633tM7IfnYATSAARPUrPmRIEKvjk"
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/courses")

COURSES = {
    "basic-prompt-engineering":       "prompt engineering AI chat interface",
    "ai-driven-data-analysis":        "AI data analysis visualization",
    "genai-in-scm-planning":          "supply chain planning strategy",
    "low-code-ai-agent-design":       "low code software automation",
    "ai-strategic-leadership":        "executive leadership AI technology",
    "aiot-strategic-roadmap":         "AIoT smart technology roadmap",
    "lean-thinking-4":                "lean manufacturing process kaizen",
    "six-sigma-green-belt":           "quality control measurement factory",
    "applied-spc":                    "statistical process control chart",
    "doe-process-optimization":       "engineering process optimization",
    "quality-4-strategy":             "quality management industry 4.0",
    "inventory-masterclass":          "warehouse inventory shelves",
    "routing-fleet-ops":              "fleet trucks logistics routing",
    "warehouse-flow-design":          "warehouse operations forklift",
    "supply-chain-network-design":    "global supply chain network map",
    "simulation-decision-support":    "simulation analytics decision dashboard",
    "logistics-dashboarding":         "logistics dashboard analytics screen",
    "sql-for-supply-chain":           "database SQL code technology",
    "advanced-demand-planning":       "demand forecasting charts planning",
    "digital-twin-foundation":        "digital twin 3D factory simulation",
    "digital-transformation-roadmap": "digital transformation business technology",
    "customs-trade-practice":         "customs port shipping containers",
    "operations-standards-iso":       "ISO certification quality standards",
    "fta-rules-of-origin-master":     "international trade shipping globe",
    "legal-risk-in-logistics":        "legal business law documents",
    "integrity-digital-compliance":   "digital compliance cybersecurity",
    "industrial-iot-sensors":         "industrial IoT sensors factory",
    "computer-vision-in-ops":         "computer vision camera AI detection",
    "realtime-monitoring-systems":    "real-time monitoring control room",
    "predictive-maintenance-aiot":    "predictive maintenance machine sensor",
    "operational-leadership":         "team leadership operations management",
    "project-execution-for-engineers":"engineering project planning",
    "structural-problem-solving":     "problem solving whiteboard strategy",
    "supply-chain-executive-path":    "executive business supply chain",
    "technical-presentation-excellence": "professional presentation business",
}

def search_photo(query: str):
    params = urllib.parse.urlencode({
        "query": query,
        "per_page": 1,
        "orientation": "landscape",
    })
    url = f"https://api.unsplash.com/search/photos?{params}"
    req = urllib.request.Request(url, headers={"Authorization": f"Client-ID {ACCESS_KEY}"})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            results = data.get("results", [])
            if results:
                return results[0]
    except Exception as e:
        print(f"  search error: {e}")
    return None

def download_image(url: str, dest: str) -> bool:
    try:
        urllib.request.urlretrieve(url, dest)
        return True
    except Exception as e:
        print(f"  download error: {e}")
        return False

def convert_to_webp(src: str, dest_webp: str) -> bool:
    try:
        result = subprocess.run(
            [
                "node",
                "-e",
                "const sharp=require('sharp'); sharp(process.argv[1]).webp({quality:82}).toFile(process.argv[2]).catch((err)=>{console.error(err);process.exit(1)})",
                src,
                dest_webp,
            ],
            capture_output=True, text=True
        )
        return result.returncode == 0
    except Exception as e:
        print(f"  convert error: {e}")
        return False

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    done = []
    failed = []

    for slug, query in COURSES.items():
        dest_webp = os.path.join(OUT_DIR, f"course-{slug}.webp")
        temp_download = os.path.join(OUT_DIR, f"course-{slug}.source")
        if os.path.exists(dest_webp):
            print(f"  skip (exists): course-{slug}")
            done.append(slug)
            continue

        print(f"[{slug}]")
        photo = search_photo(query)
        if not photo:
            print(f"  no result for: {query}")
            failed.append(slug)
            continue

        img_url = photo["urls"]["small"]  # 400px — right size for cards
        photographer = photo["user"]["name"]
        print(f"  photo by {photographer}")

        if not download_image(img_url, temp_download):
            failed.append(slug)
            continue

        if not convert_to_webp(temp_download, dest_webp):
            failed.append(slug)
            continue

        if os.path.exists(temp_download):
            os.remove(temp_download)

        print(f"  saved: course-{slug}.webp")
        done.append(slug)
        time.sleep(0.3)

    print(f"\nDone: {len(done)} ok, {len(failed)} failed")
    if failed:
        print("Failed:", failed)

    # Print CourseCard image map
    print("\n--- CourseCard images map ---")
    for slug in sorted(COURSES.keys()):
        if os.path.exists(os.path.join(OUT_DIR, f"course-{slug}.webp")):
            print(f'    "{slug}": "/images/courses/course-{slug}.webp",')

if __name__ == "__main__":
    main()
