/**
 * Heq sfondin neutral (checkerboard / e bardhë) nga PNG dhe ruan vetëm violinën.
 * Ekzekutoni: node scripts/process-violin.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PNG } from 'pngjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const input = path.join(__dirname, '../public/images/violin.png')

const buffer = fs.readFileSync(input)
const png = PNG.sync.read(buffer)

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2
    const r = png.data[idx]
    const g = png.data[idx + 1]
    const b = png.data[idx + 2]
    const mx = Math.max(r, g, b)
    const mn = Math.min(r, g, b)
    const sat = mx > 0 ? (mx - mn) / mx : 0
    const light = mx / 255
    const warmWood = r - b > 25 && r > 110
    const isBg = ((light > 0.6 && sat < 0.2) || (light > 0.75 && sat < 0.3)) && !warmWood

    if (isBg) {
      png.data[idx + 3] = 0
    }
  }
}

fs.writeFileSync(input, PNG.sync.write(png))
console.log('Processed:', input)
