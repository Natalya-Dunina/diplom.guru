/**
 * Страница редактирования статьи
 */
export class ArticleEditPage {
  constructor(page) {
    this.page = page
    // Поля формы редактирования статьи
    this.titleInput = this.page.getByRole('textbox', { name: 'Article Title' })
    this.descriptionInput = this.page.getByRole('textbox', { name: "What's this article about?" })
    this.bodyInput = this.page.getByRole('textbox', { name: 'Write your article (in markdown)' })
    this.tagInput = this.page.getByRole('textbox', { name: 'Enter tags' })
    this.updateButton = this.page.getByRole('button', { name: 'Update Article' })
  }

  /**
   * Обновить статью с новыми данными
   * @param {string} title - Заголовок статьи
   * @param {string} topic - Описание статьи
   * @param {string} content - Содержание статьи (markdown)
   * @param {string} tag - Тег статьи
   */
  async updateArticle(title, topic, content, tag) {
    await this.titleInput.fill(title)
    await this.descriptionInput.fill(topic)
    await this.bodyInput.fill(content)
    await this.tagInput.fill(tag)
    await this.updateButton.click()
  }
}
