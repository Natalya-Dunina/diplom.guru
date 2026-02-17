/**
 * Страница регистрации нового пользователя
 */
export class RegisterPage {
  constructor(page) {
    this.page = page
    // Поля формы регистрации
    this.nameInput = this.page.getByRole('textbox', { name: 'Your Name' })
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' })
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' })
    this.signUpButton = this.page.getByRole('button', { name: 'Sign up' })
  }

  /**
   * Зарегистрировать нового пользователя
   * @param {string} name - Имя пользователя
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль пользователя
   */
  async register(name, email, password) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signUpButton.click()
  }
}
