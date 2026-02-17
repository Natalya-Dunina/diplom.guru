/**
 * Страница просмотра статьи
 */
export class ArticleViewPage {
  constructor(page) {
    this.page = page
    // Локаторы для статьи и комментариев
    this.articleContent = this.page.locator('.article-content p').first()
    this.commentInput = this.page.getByRole('textbox', { name: 'Write a comment...' })
    this.commentButton = this.page.getByRole('button', { name: 'Post Comment' })
    this.commentText = this.page.locator('.card .card-block .card-text').first()
    this.editArticleButton = this.page.getByRole('link', { name: 'Edit Article' }).first()
  }

  /**
   * Добавить комментарий к статье
   * @param {string} text - Текст комментария
   */
  async addComment(text) {
    await this.commentInput.fill(text)
    await this.commentButton.click()
  }

  /**
   * Получить содержание статьи
   * @returns {Promise<string>} Текст статьи
   */
  async getArticleContent() {
    return await this.articleContent.textContent()
  }

  /**
   * Получить текст первого комментария
   * @returns {Promise<string>} Текст комментария
   */
  async getCommentContent() {
    return await this.commentText.textContent()
  }

  /**
   * Открыть страницу редактирования статьи
   */
  async openEditArticle() {
    await this.editArticleButton.click()
  }
}
