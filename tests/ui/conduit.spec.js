import { ArticleBuilder, RealWorldUserBuilder } from '../../helpers/builders'
import { test, expect, step, registerUser, createArticle } from '../../helpers/fixtures'

const createCommentText = () => `Test comment ${new Date().toISOString()}`

/** @typedef {import('../../src/pageObject/app').App} App */

test.describe('Articles', () => {
  let user
  let article

  test.beforeEach(() => {
    user = new RealWorldUserBuilder().addName().addEmail().addPassword().generate()
    article = new ArticleBuilder().addTitle().addTopic().addContent().addTag().generate()
  })

  test('User can create new article', async (/** @type {{ app: App }} */ { app }) => {
    await registerUser(app, user)
    await createArticle(app, article)

    await step('Article content should match', async () => {
      await expect(app.articleViewPage.articleContent).toContainText(article.content)
    })
  })

  test('User can create new comment on the article', async (/** @type {{ app: App }} */ { app }) => {
    await registerUser(app, user)
    await createArticle(app, article)

    const commentText = createCommentText()
    await app.articleViewPage.addComment(commentText)

    await step('Comment should be visible', async () => {
      await expect(app.articleViewPage.commentText).toContainText(commentText)
    })
    }
  )

  test('User can edit his article', async (/** @type {{ app: App }} */ { app }) => {
    const updatedArticle = new ArticleBuilder().addTitle().addTopic().addContent().addTag().generate()

    await registerUser(app, user)
    await createArticle(app, article)

    await app.articleViewPage.openEditArticle()
    await app.articleEditPage.updateArticle(
      updatedArticle.title,
      updatedArticle.topic,
      updatedArticle.content,
      updatedArticle.tag
    )

    await step('Updated content should match', async () => {
      await expect(app.articleViewPage.articleContent).toContainText(updatedArticle.content)
    })
  })

  test('User can add his article to favorite', async (/** @type {{ app: App }} */ { app }) => {
    await registerUser(app, user)
    await createArticle(app, article)

    await app.header.openProfile()
    
    await app.profilePage.addToFavorites()
    await app.profilePage.openFavoritedTab()

    await step('Favorite count should be 1', async () => {
      await expect(app.profilePage.favoriteButton).toContainText('1')
    })
  })

  test('User can remove his article from favorite', async (/** @type {{ app: App, page: import('@playwright/test').Page }} */ { app, page }) => {
    await registerUser(app, user)
    await createArticle(app, article)

    await app.header.openProfile()
    await app.profilePage.addToFavorites()
    await app.profilePage.openFavoritedTab()
    await expect(app.profilePage.favoriteButton).toContainText('1')

    await app.profilePage.removeFromFavorites()
    await page.reload()

    await step('Article should not be in favorites', async () => {
      await expect(page.getByText(article.title)).toHaveCount(0)
    })
    }
  )
})
