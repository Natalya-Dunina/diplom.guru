import axios from 'axios'
import * as allure from 'allure-js-commons'

/**
 * Сервис для работы с Airport Gap API
 * Документация API: https://airportgap.com/docs
 */
export class AirportGapService {
  constructor(options) {
    this.options = options
    this.baseURL = options?.baseURL
    this.token = null
  }

  /**
   * Получение списка всех аэропортов с пагинацией
   * GET /api/airports
   */
  async getAllAirports(page = 1) {
    return await allure.step('Get list of all airports', async () => {
      const response = await axios.get(`${this.baseURL}/airports`, {
        params: { page }
      })
      return response
    })
  }

  /**
   * Получение информации о конкретном аэропорте по IATA коду
   * GET /api/airports/:id
   */
  async getAirportById(iataCode) {
    return await allure.step(`Get airport by IATA code: ${iataCode}`, async () => {
      const response = await axios.get(`${this.baseURL}/airports/${iataCode}`)
      return response
    })
  }

  /**
   * Вычисление расстояния между двумя аэропортами
   * POST /api/airports/distance
   */
  async calculateDistance(fromIata, toIata) {
    return await allure.step(`Calculate distance between ${fromIata} and ${toIata}`, async () => {
      const response = await axios.post(`${this.baseURL}/airports/distance`, {
        from: fromIata,
        to: toIata
      })
      return response
    })
  }

  /**
   * Получение токена аутентификации
   * POST /api/tokens
   */
  async getToken(email, password) {
    return await allure.step('Get authentication token', async () => {
      const response = await axios.post(`${this.baseURL}/tokens`, {
        email,
        password
      })
      this.token = response.data.token
      return response
    })
  }

  /**
   * Получение списка избранных аэропортов пользователя
   * GET /api/favorites
   */
  async getFavorites(page = 1) {
    return await allure.step('Get list of favorite airports', async () => {
      const response = await axios.get(`${this.baseURL}/favorites`, {
        params: { page },
        headers: {
          Authorization: `Bearer token=${this.token}`
        }
      })
      return response
    })
  }

  /**
   * Добавление аэропорта в избранное
   * POST /api/favorites
   */
  async addFavorite(airportId, note = '') {
    return await allure.step(`Add airport ${airportId} to favorites`, async () => {
      const response = await axios.post(
        `${this.baseURL}/favorites`,
        {
          airport_id: airportId,
          note
        },
        {
          headers: {
            Authorization: `Bearer token=${this.token}`
          }
        }
      )
      return response
    })
  }

  /**
   * Обновление заметки для избранного аэропорта
   * PATCH /api/favorites/:id
   */
  async updateFavorite(favoriteId, note) {
    return await allure.step(`Update favorite ${favoriteId}`, async () => {
      const response = await axios.patch(
        `${this.baseURL}/favorites/${favoriteId}`,
        {
          note
        },
        {
          headers: {
            Authorization: `Bearer token=${this.token}`
          }
        }
      )
      return response
    })
  }

  /**
   * Удаление аэропорта из избранного
   * DELETE /api/favorites/:id
   */
  async deleteFavorite(favoriteId) {
    return await allure.step(`Delete favorite ${favoriteId}`, async () => {
      const response = await axios.delete(`${this.baseURL}/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer token=${this.token}`
        }
      })
      return response
    })
  }

  /**
   * Удаление всех избранных аэропортов
   * DELETE /api/favorites/clear_all
   */
  async clearAllFavorites() {
    return await allure.step('Clear all favorite airports', async () => {
      const response = await axios.delete(`${this.baseURL}/favorites/clear_all`, {
        headers: {
          Authorization: `Bearer token=${this.token}`
        }
      })
      return response
    })
  }
}
