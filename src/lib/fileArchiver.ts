import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export class FileArchiver {
  private static _instance: FileArchiver
  static get instance(): FileArchiver {
    if (!FileArchiver._instance) FileArchiver._instance = new FileArchiver()
    return FileArchiver._instance
  }
  save(files: File[], zipName: string)
  save(files: FileList, zipName: string)
  save(files: any, zipName: string) {
    if (!files) return

    let zip = new JSZip()
    let length = files.length
    for (let i = 0; i < length; i++) {
      let file = files[i]
      zip.file(file.name, file)
    }

    zip
      .generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6,
        },
      })
      .then((blob) => saveAs(blob, zipName + '.zip'))
  }
}

export const converDocToXML = (doc: Document) => {
  const oSerializer = new XMLSerializer()
  const sXML = oSerializer.serializeToString(doc)
  return sXML
}
