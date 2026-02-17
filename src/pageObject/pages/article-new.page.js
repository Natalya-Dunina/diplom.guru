/**
 * Страница создания новой статьи
 */
export class ArticleNewPage {
  constructor(page) {
    this.page = page
    // Поля формы создания статьи
    this.titleInput = this.page.getByRole('textbox', { name: 'Article Title' })
    this.descriptionInput = this.page.getByRole('textbox', { name: "What's this article about?" })
    this.bodyInput = this.page.getByRole('textbox', { name: 'Write your article (in markdown)' })
    this.tagInput = this.page.getByRole('textbox', { name: 'Enter tags' })
    this.publishButton = this.page.getByRole('button', { name: 'Publish Article' })
  }

  /**
   * Создать новую статью
   * @param {string} title - Заголовок статьи
   * @param {string} topic - Описание статьи
   * @param {string} content - Содержание статьи (markdown)
   * @param {string} tag - Тег статьи
   */
  async createArticle(title, topic, content, tag) {
    await this.titleInput.fill(title)
    await this.descriptionInput.fill(topic)
    await this.bodyInput.fill(content)
    await this.tagInput.fill(tag)
    await this.publishButton.click()
    // Ждем перехода на страницу просмотра статьи (URL содержит /article/)
    await this.page.waitForURL(/\/article\//, { timeout: 10000 })
  }
}
