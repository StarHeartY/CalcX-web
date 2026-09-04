import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(scriptDir, '..', 'dist')
const port = 4173

function findInstalledBrowser() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ]
  return candidates.find((candidate) => candidate && fs.existsSync(candidate))
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://localhost:${port}`).pathname)
  const relativePath = pathname.endsWith('/') ? `${pathname}index.html` : pathname
  const resolved = path.resolve(distDir, `.${relativePath}`)
  return resolved.startsWith(distDir) ? resolved : null
}

function serve() {
  return http.createServer((request, response) => {
    const filePath = resolveRequestPath(request.url ?? '/')
    if (!filePath) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404)
        response.end('Not found')
        return
      }
      response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] ?? 'application/octet-stream' })
      response.end(data)
    })
  })
}

async function prerender() {
  const server = serve()
  await new Promise((resolve) => server.listen(port, resolve))
  const executablePath = findInstalledBrowser()
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ])

    for (const target of [
      { route: '/', output: 'index.html' },
      { route: '/en/', output: path.join('en', 'index.html') },
    ]) {
      await page.goto(`http://localhost:${port}${target.route}`, { waitUntil: 'networkidle0' })
      const html = await page.content()
      fs.writeFileSync(path.join(distDir, target.output), html, 'utf8')
      console.log(`Prerendered ${target.route} -> ${target.output}`)
    }
  } finally {
    await browser.close()
    server.close()
  }
}

prerender().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
