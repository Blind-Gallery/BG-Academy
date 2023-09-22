require('dotenv').config()

const LoremIpsum = require('lorem-ipsum').LoremIpsum
const Vimeo = require('vimeo').Vimeo

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

const client = new Vimeo(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.ACCESS_TOKEN
)

const name = lorem.generateWords(3)
const description = lorem.generateSentences(5)

const fileName = './videos/Academy Test Video 2.mp4'
client.upload(
  fileName,
  {
    name,
    description
  },
  function (uri) {
    console.log('Your video URI is: ' + uri)
    client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
      if (error) {
        console.log('There was an error making the request.')
        console.log('Server reported: ' + error)
        return
      }
      console.log('name: ', name)
      console.log('description: ', description)
      console.log('Your video link is: ' + body.link)
    })
  },
  function (bytesUploaded, bytesTotal) {
    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
    console.log(bytesUploaded, bytesTotal, percentage + '%')
  },
  function (error) {
    console.log('Failed because: ' + error)
  }
)
