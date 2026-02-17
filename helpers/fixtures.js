import { test as base } from '@playwright/test'
import { step } from 'allure-js-commons'
import { App } from '../src/pageObject/app'
import { uiBaseUrl } from './constants'

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page)
    await page.setViewportSize({ width: 1800, height: 800 })
    await app.basePage.open(uiBaseUrl)
    await use(app)
  }
})

export { expect } from '@playwright/test'
export { step }

/**
 * Зарегистрировать нового пользователя
 * @param {App} app - Экземпляр приложения
 * @param {Object} userData - Данные пользователя
 * @param {string} userData.name - Имя пользователя
 * @param {string} userData.email - Email пользователя
 * @param {string} userData.password - Пароль пользователя
 */
export const registerUser = async (app, userData) => {
  await step('Register new user', async () => {
    await app.header.openRegister()
    await app.registerPage.register(userData.name, userData.email, userData.password)
  })
}

/**
 * Создать новую статью
 * @param {App} app - Экземпляр приложения
 * @param {Object} articleData - Данные статьи
 * @param {string} articleData.title - Заголовок статьи
 * @param {string} articleData.topic - Описание статьи
 * @param {string} articleData.content - Содержание статьи
 * @param {string} articleData.tag - Тег статьи
 */
export const createArticle = async (app, articleData) => {
  await step('Create new article', async () => {
    await app.header.openNewArticle()
    await app.articleNewPage.createArticle(
      articleData.title,
      articleData.topic,
      articleData.content,
      articleData.tag
    )
  })
}
