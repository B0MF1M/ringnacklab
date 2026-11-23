import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, '.output', 'public')

const run = (cmd, args, cwd = root) => {
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
}

if (!process.argv.includes('--skip-build')) {
  console.log('1/3 Gerando build estático (npm run generate)...')
  run('npm', ['run', 'generate'])
}

if (!fs.existsSync(distDir)) {
  throw new Error('Pasta .output/public não encontrada.')
}

const remoteUrl = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root })
  .toString()
  .trim()

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ringnacklab-ghpages-'))
try {
  console.log('2/3 Preparando branch gh-pages...')
  fs.cpSync(distDir, tmpDir, { recursive: true })
  run('git', ['init', '-b', 'gh-pages'], tmpDir)
  run('git', ['add', '-A'], tmpDir)
  run('git', ['commit', '-m', 'Deploy RingnackLab para GitHub Pages'], tmpDir)
  console.log('3/3 Enviando para o GitHub Pages...')
  run('git', ['push', '--force', remoteUrl, 'gh-pages:gh-pages'], tmpDir)
  console.log('Deploy concluído com sucesso!')
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true })
}
