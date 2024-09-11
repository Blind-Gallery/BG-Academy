export default class ShareSocialMediaService {
  constructor (id) {
    this.documentId = id
  }

  shareToWarpcast (msj, urlEmbed) {
    window.open(`https://warpcast.com/~/compose?text=${msj}&embeds[]=${urlEmbed}`)
  }

  shareToTwitter (msj, urlEmbed) {
    window.open(`http://twitter.com/share?url=${urlEmbed}&via=trucsweb&text=${msj}`)
  }
}
