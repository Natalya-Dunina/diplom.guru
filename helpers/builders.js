import { fakerRU as faker } from '@faker-js/faker'

const getReadableDateTime = () => {
  const now = new Date()
  return now.toISOString().replace('T', ' ').replace('Z', '')
}

export class RealWorldUserBuilder {
  addEmail() {
    this.email = faker.internet.email({ provider: 'qa.guru' })
    return this
  }
  addName() {
    this.name = `user_${faker.string.alpha({ length: 6 })}`
    return this
  }
  addPassword() {
    this.password = faker.internet.password({ length: 10 })
    return this
  }
  generate() {
    const copied = structuredClone({
      email: this.email,
      name: this.name,
      password: this.password
    })
    return copied
  }
}

export class ArticleBuilder {
  addTitle() {
    this.title = `title_${faker.string.alpha({ length: 8 })}`
    return this
  }
  addTopic() {
    this.topic = `Test topic ${getReadableDateTime()}`
    return this
  }
  addContent() {
    this.content = `Test content ${getReadableDateTime()}`
    return this
  }
  addTag() {
    this.tag = `tag_${faker.string.alpha({ length: 6 })}`
    return this
  }
  generate() {
    const copied = structuredClone({
      title: this.title,
      topic: this.topic,
      content: this.content,
      tag: this.tag
    })
    return copied
  }
}
