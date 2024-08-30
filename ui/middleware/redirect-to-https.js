export default function ({ req, redirect }) {
  if (process.server) {
    const isSecure = req.headers['x-forwarded-proto'] === 'https'
    if (!isSecure) {
      const host = req.headers.host
      const url = req.url
      return redirect(301, `https://${host}${url}`)
    }
  }
}
