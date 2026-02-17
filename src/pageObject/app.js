import {
  BasePage,
  Header,
  RegisterPage,
  ArticleNewPage,
  ArticleViewPage,
  ArticleEditPage,
  ProfilePage
} from './index'

export class App {
  constructor(page) {
    this.basePage = new BasePage(page)
    this.header = new Header(page)
    this.registerPage = new RegisterPage(page)
    this.articleNewPage = new ArticleNewPage(page)
    this.articleViewPage = new ArticleViewPage(page)
    this.articleEditPage = new ArticleEditPage(page)
    this.profilePage = new ProfilePage(page)
  }
}
