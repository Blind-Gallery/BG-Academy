export default function ({ req, redirect }) {
  if (process.server && process.env.NODE_ENV !== 'development') {
    const isSecure = req.headers['x-forwarded-proto'] === 'https'
    if (!isSecure) {
      const { host } = req.headers
      const { url } = req
      // Use 307 for temporary redirect or 308 for permanent redirect
      return redirect(307, `https://${host}${url}`)
    }
  }
}
