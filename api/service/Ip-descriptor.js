const axios = require('axios').default

class IpDescriptor {
  async getIPDetails (ip) {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`)
    return data
  }

  async isValidIP (ip) {
    const details = await this.getIPDetails(ip)
    return details.status === 'success'
  }
}

module.exports = IpDescriptor
