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
        saveAs(blob, 'academyCoursePassed.jpg')
      })
  }

  shareToInstagram () {
    this.createImage()
  }

  shareToWarpcast (msj, urlEmbed) {
    window.open(`https://warpcast.com/~/compose?text=${msj}&embeds[]=${urlEmbed}`)
  }

  shareToTwitter (msj, urlEmbed) {
    window.open(`http://twitter.com/share?url=${urlEmbed}&via=trucsweb&text=${msj}`)
  }
}
