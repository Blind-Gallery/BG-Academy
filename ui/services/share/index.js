export default class ShareSocialMediaService {
  shareToWarpcast (msj, urlEmbed) {
    window.open(`https://warpcast.com/~/compose?text=${msj}&embeds[]=${urlEmbed}`)
  }

  shareToTwitter(msj, urlEmbed) {
    window.open(`http://twitter.com/share?url=${urlEmbed}&text=${msj}`)
  }
}
