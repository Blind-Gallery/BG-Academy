class Emails {
  constructor ({ email }) {
    this.email = email
  }

  async sendContactEmail ({ name, email, description, company }) {
    const html = `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Company: ${company}</p>
      <p>Description: ${description}</p>
    `

    const text = `
      Name: ${name}
      Email: ${email}
      Company: ${company}
      Description: ${description}
    `

    await this.email.sendEmail({
      to: 'hugo@echolabs.co',
      subject: 'Contact - Echo',
      html,
      text
    })
  }

  async sendBecomeAnInstructorEmail ({ name, email, description }) {
    const html = `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>What kind of courses: ${description}</p>
    `

    const text = `
      Name: ${name}
      Email: ${email}
      What kind of courses: ${description}
    `

    await this.email.sendEmail({
      to: 'hugo@echolabs.co',
      subject: 'Become an instructor',
      html,
      text
    })

    return { status: 'sent' }
  }
}

module.exports = Emails
