import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'

export default class ShareSocialMediaService {
  constructor (id) {
    this.documentId = id
  }

  createImage () {
    htmlToImage
      .toBlob(document.getElementById(this.documentId))
      .then(function (blob) {
        saveAs(blob, 'academyCoursePassed.png')
      })
  }

  shareToInstagram () {
    this.createImage()
  }
}
