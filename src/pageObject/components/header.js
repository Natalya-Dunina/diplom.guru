/**
 * Компонент Header (шапка сайта) с навигационными элементами
 */
export class Header {
  constructor(page) {
    this.page = page
    // Навигационные ссылки в header
    this.signUpLink = this.page.getByRole('link', { name: 'Sign up' })
    this.signInLink = this.page.getByRole('link', { name: 'Sign in' })
    this.newArticleLink = this.page.getByRole('link', { name: 'New Article' })
    // Dropdown-переключатель для открытия меню профиля
    this.profileDropdown = page.locator('.dropdown-toggle')
    this.profileLink = page.getByRole('link', { name: 'Profile' })
  }

  /**
   * Открыть страницу регистрации
   */
  async openRegister() {
    await this.signUpLink.waitFor({ state: 'visible' })
    await this.signUpLink.click()
  }

  /**
   * Открыть страницу входа
   */
  async openLogin() {
    await this.signInLink.waitFor({ state: 'visible' })
    await this.signInLink.click()
  }

  /**
   * Открыть редактор новой статьи
   */
  async openNewArticle() {
    await this.newArticleLink.waitFor({ state: 'visible' })
    await this.newArticleLink.click()
  }

  /**
   * Открыть страницу профиля (через dropdown меню)
   */
  async openProfile() {
    await this.profileDropdown.waitFor({ state: 'visible' })
    await this.profileDropdown.click()
    await this.profileLink.waitFor({ state: 'visible' })
    await this.profileLink.click()
  }
}
