import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')
const port = 4173

// Start a static file server
function serve() {
  return http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? '/index.html' : req.url)
    const ext = path.extname(filePath)

    const mime = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.end('Not found')
      } else {
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' })
        res.end(data)
      }
    })
  })
}

async function prerender() {
  console.log('Starting prerender...')

  const server = serve()
  await new Promise(resolve => server.listen(port, resolve))
  console.log(`Static server running on http://localhost:${port}`)

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' })
    // Extra wait to ensure scroll-reveal animations have completed
    await page.evaluate(() => {
      // Trigger all scroll-reveal elements to be visible
      document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        el.classList.add('visible')
      })
    })
    await new Promise(r => setTimeout(r, 500))

    const html = await page.content()
    const indexPath = path.join(distDir, 'index.html')
    fs.writeFileSync(indexPath, html, 'utf-8')
    console.log(`Prerendered HTML written to ${indexPath} (${(html.length / 1024).toFixed(1)} KB)`)
  } finally {
    await browser.close()
    server.close()
  }
}

prerender().catch(err => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
