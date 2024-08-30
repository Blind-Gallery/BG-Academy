export default function ({ req, redirect }) {
  if (process.server && process.env.NODE_ENV !== 'development') {
    const isSecure = req.headers['x-forwarded-proto'] === 'https'
    if (!isSecure) {
      const { host } = req.headers
      const { url } = req
      return redirect(301, `https://${host}${url}`)
    }
  }
}
