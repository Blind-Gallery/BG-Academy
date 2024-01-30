class Emails {
  constructor ({ email }) {
    this.email = email
  }

  async becomeAnInstructor ({ name, email, description }) {
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
