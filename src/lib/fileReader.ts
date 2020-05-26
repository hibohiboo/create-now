import fs from 'fs'
import path from 'path'

export function readFile(dirName, fileName) {
  const targetsDirectory = path.join(process.cwd(), dirName)
  const fullPath = path.join(targetsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return fileContents
}
