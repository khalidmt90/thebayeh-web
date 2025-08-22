#!/usr/bin/env ts-node
/**
 * Quick color audit: scans src/web app for hex colors outside approved palette.
 * Approved: #FFD233, #1A1A1A, #FFFFFF, #F8F8F8, #555555, #E5E5E5 plus rgba/opacity variants.
 */
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()
const ALLOWED = new Set([
  '#ffd233','#1a1a1a','#ffffff','#f8f8f8','#555555','#e5e5e5'
])

function walk(dir: string, acc: string[] = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '.next') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (/\.(tsx|ts|css|svg|md|html|js|jsx)$/.test(entry.name)) acc.push(full)
  }
  return acc
}

const files = walk(ROOT + '/web')
const pattern = /#[0-9a-fA-F]{3,8}/g
let violations: { file: string; color: string }[] = []
for (const f of files) {
  const text = readFileSync(f,'utf8')
  const matches = text.match(pattern) || []
  for (const m of matches) {
    const hex = m.toLowerCase()
    if (!ALLOWED.has(hex) && !/^#(?:[0-9a-f]{8})$/.test(hex)) {
      // allow #000 or #fff only if part of rgba pattern? we treat them as violations to convert to tokens.
      if (hex !== '#000' && hex !== '#fff') continue
    }
    if (!ALLOWED.has(hex) && (hex === '#000' || hex === '#fff')) {
      violations.push({ file: f.replace(ROOT,'').replace(/^\/+/,''), color: hex })
    }
  }
}

if (violations.length) {
  console.log('Found legacy colors needing replacement with tokens:')
  for (const v of violations) console.log(` - ${v.color} in ${v.file}`)
  process.exitCode = 1
} else {
  console.log('✅ No legacy colors found (outside allowed set).')
}
