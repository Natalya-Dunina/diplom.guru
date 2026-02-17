/**
 * Страница профиля пользователя
 */
export class ProfilePage {
  constructor(page) {
    this.page = page
    this.myArticlesTab = this.page.getByRole('link', { name: 'My Articles' })
    this.favoritedTab = this.page.getByRole('link', { name: /Favorited/i })
    // Отдельные локаторы для разных состояний избранного - точное совпадение как в рабочем примере
    // Примечание: пробел перед '(' - это иконка сердца ❤
    this.favoriteButton0 = this.page.getByRole('button', { name: ' ( 0 )' })
    this.favoriteButton1 = this.page.getByRole('button', { name: ' ( 1 )' })
    // Общий локатор для получения текущего состояния
    this.favoriteButton = this.page.locator('button').filter({
      hasText: /\(\s*\d+\s*\)/
    }).first()
  }

  /**
   * Добавить статью в избранное (кликнуть по кнопке с 0)
   */
  async addToFavorites() {
    await this.favoriteButton0.waitFor({ state: 'visible' })
    await this.favoriteButton0.click()
    // Ждем изменения состояния (кнопка с 0 → кнопка с 1)
    await this.favoriteButton1.waitFor({ state: 'visible' })
  }

  /**
   * Удалить статью из избранного (кликнуть по кнопке с 1)
   */
  async removeFromFavorites() {
    await this.favoriteButton1.waitFor({ state: 'visible' })
    await this.favoriteButton1.click()
    // Ждем изменения состояния (кнопка с 1 → кнопка с 0)
    await this.favoriteButton0.waitFor({ state: 'visible' })
  }

  /**
   * Открыть вкладку "Favorited Articles"
   */
  async openFavoritedTab() {
    await this.favoritedTab.waitFor({ state: 'visible' })
    await this.favoritedTab.click()
  }

  /**
   * Открыть вкладку "My Articles"
   */
  async openMyArticlesTab() {
    await this.myArticlesTab.waitFor({ state: 'visible' })
    await this.myArticlesTab.click()
  }

  /**
   * Получить количество избранных статей из текста кнопки
   * @returns {Promise<number>} Количество избранных статей
   */
  async getFavoriteCount() {
    const text = (await this.favoriteButton.textContent()) || ''
    const match = text.match(/\d+/)
    return match ? Number(match[0]) : 0
  }
}
