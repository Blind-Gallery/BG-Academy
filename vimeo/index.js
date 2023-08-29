require('dotenv').config()

console.log(process.env.CLIENT_ID)

const Vimeo = require('vimeo').Vimeo
const client = new Vimeo(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.ACCESS_TOKEN
)

// const file_name = './videos/Academy Test Video 1.mp4'
// client.upload(
//   file_name,
//   {
//     name: 'test',
//     description: 'The description goes here.'
//   },
//   function (uri) {
//     console.log('Your video URI is: ' + uri)
//   },
//   function (bytes_uploaded, bytes_total) {
//     const percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
//     console.log(bytes_uploaded, bytes_total, percentage + '%')
//   },
//   function (error) {
//     console.log('Failed because: ' + error)
//   }
// )

// client.request('/videos/859094052' + '?fields=transcode.status', function (error, body, status_code, headers) {
//   if (body.transcode.status === 'complete') {
//     console.log('Your video finished transcoding.')
//   } else if (body.transcode.status === 'in_progress') {
//     console.log('Your video is still transcoding.')
//   } else {
//     console.log('Your video encountered an error during transcoding.')
//   }
// })

client.request('/videos/859094052' + '?fields=link', function (error, body, statusCode, headers) {
  if (error) {
    console.log('There was an error making the request.')
    console.log('Server reported: ' + error)
    return
  }

  console.log('Your video link is: ' + body.link)
})
