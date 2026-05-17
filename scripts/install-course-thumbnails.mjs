import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const ROOT = path.resolve(path.dirname(__filename), "..")
const SOURCE_DIR = path.join(ROOT, "tmp_docs", "thumbnail 35 môn học")
const OUTPUT_DIR = path.join(ROOT, "public", "images", "courses")

const IMAGE_MAP = {
  "Basic Prompt Engineering.png": "basic-prompt-engineering",
  "AI-Driven Data Analysis.png": "ai-driven-data-analysis",
  "GenAI in Supply Chain Planning.png": "genai-in-scm-planning",
  "Low-code AI Agent Design.png": "low-code-ai-agent-design",
  "AI Strategic Leadership.png": "ai-strategic-leadership",
  "Lean Thinking 4.0.png": "lean-thinking-4",
  "Six Sigma Green Belt.png": "six-sigma-green-belt",
  "Applied SPC.png": "applied-spc",
  "DoE for Process Optimization.png": "doe-process-optimization",
  "Quality 4.0 Strategy.png": "quality-4-strategy",
  "Inventory Masterclass.png": "inventory-masterclass",
  "Routing & Fleet Ops.png": "routing-fleet-ops",
  "Warehouse Flow Design.png": "warehouse-flow-design",
  "Supply Chain Network Design.png": "supply-chain-network-design",
  "Simulation & Decision Support.png": "simulation-decision-support",
  "Logistics Dashboarding.png": "logistics-dashboarding",
  "SQL for Supply Chain.png": "sql-for-supply-chain",
  "Advanced Demand Planning.png": "advanced-demand-planning",
  "Digital Twin Foundation.png": "digital-twin-foundation",
  "Digital Transformation Roadmap.png": "digital-transformation-roadmap",
  "Customs & Trade Practice.png": "customs-trade-practice",
  "Operations Standards (ISO).png": "operations-standards-iso",
  "FTA & Rules of Origin Master.png": "fta-rules-of-origin-master",
  "Legal Risk in Logistics.png": "legal-risk-in-logistics",
  "Integrity & Digital Compliance.png": "integrity-digital-compliance",
  "Industrial IoT & Sensors.png": "industrial-iot-sensors",
  "Computer Vision in Ops.png": "computer-vision-in-ops",
  "Real-time Monitoring Systems.png": "realtime-monitoring-systems",
  "Predictive Maintenance (AIoT).png": "predictive-maintenance-aiot",
  "AIoT Strategic Roadmap.png": "aiot-strategic-roadmap",
  "Technical Presentation Excellence.png": "technical-presentation-excellence",
  "Structural Problem Solving.png": "structural-problem-solving",
  "Project Execution for Engineers.png": "project-execution-for-engineers",
  "Operational Leadership.png": "operational-leadership",
  "Supply Chain Executive Path.png": "supply-chain-executive-path",
}

function assertSourceFiles() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`)
  }

  const sourceFiles = fs.readdirSync(SOURCE_DIR).filter((name) => name.endsWith(".png"))
  const expectedFiles = Object.keys(IMAGE_MAP)
  const missing = expectedFiles.filter((name) => !sourceFiles.includes(name))
  const unexpected = sourceFiles.filter((name) => !expectedFiles.includes(name))

  if (missing.length || unexpected.length) {
    console.error({ missing, unexpected })
    throw new Error("Thumbnail source files do not match IMAGE_MAP")
  }
}

async function convertToWebp(source, dest) {
  await sharp(source)
    .webp({ quality: 82 })
    .toFile(dest)
}

assertSourceFiles()
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

for (const [filename, slug] of Object.entries(IMAGE_MAP)) {
  const source = path.join(SOURCE_DIR, filename)
  const dest = path.join(OUTPUT_DIR, `course-${slug}.webp`)
  await convertToWebp(source, dest)

  console.log(`${filename} -> ${path.relative(ROOT, dest)}`)
}

const outputs = fs.readdirSync(OUTPUT_DIR).filter((name) => /^course-.+\.webp$/.test(name))
if (outputs.length !== Object.keys(IMAGE_MAP).length) {
  throw new Error(`Expected 35 course webp files, found ${outputs.length}`)
}

console.log(`Installed ${outputs.length} course thumbnails.`)
