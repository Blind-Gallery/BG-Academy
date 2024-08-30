export default function ({ req, redirect }) {
  if (process.server) {
const trustedProxies = ['127.0.0.1', '10.0.0.1']; // Add your trusted proxy IPs
const clientIp = req.connection.remoteAddress;
const isSecure = trustedProxies.includes(clientIp) && 
                 req.headers['x-forwarded-proto'] === 'https';
    if (!isSecure) {
      const {host} = req.headers
      const {url} = req
      return redirect(301, `https://${host}${url}`)
    }
  }
}
