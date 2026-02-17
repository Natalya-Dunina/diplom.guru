/**
 * Базовая страница с общими методами для всех страниц
 */
export class BasePage {
  constructor(page) {
    this.page = page
  }

  /**
   * Открыть страницу по URL
   * @param {string} url - URL страницы для открытия
   */
  async open(url) {
    await this.page.goto(url)
  }

  /**
   * Получить текущий URL страницы
   * @returns {string} Текущий URL
   */
  getUrl() {
    return this.page.url()
  }
}
