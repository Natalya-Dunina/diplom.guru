import { test, expect } from '../../helpers/fixtures'
import { AIRPORTS, EXPECTED, CITIES, HTTP_STATUS } from '../../helpers'

test.describe('Airport Gap API Tests', () => {
  /**
   * Тест проверяет получение списка всех аэропортов
   * GET /api/airports
   *
   * Проверяется:
   * - Статус ответа 200
   * - Наличие массива данных
   * - Структура объекта аэропорта (id, type, attributes)
   * - Наличие обязательных полей: name, iata, city, country
   */
  test('Get list of airports', async ({ airportService }) => {
    const response = await airportService.getAllAirports()
    const apiData = response.data.data

    expect(response.status).toBe(HTTP_STATUS.OK)
    expect(response.data).toHaveProperty('data')
    expect(Array.isArray(apiData)).toBeTruthy()
    expect(apiData.length).toBeGreaterThan(0)

    const firstAirport = apiData[0]
    expect(firstAirport).toHaveProperty('id')
    expect(firstAirport).toHaveProperty('type', EXPECTED.AIRPORT_TYPE)
    expect(firstAirport).toHaveProperty('attributes')

    expect(firstAirport.attributes).toHaveProperty('name')
    expect(firstAirport.attributes).toHaveProperty('iata')
    expect(firstAirport.attributes).toHaveProperty('city')
    expect(firstAirport.attributes).toHaveProperty('country')
  })

  /**
   * Тест проверяет получение конкретного аэропорта по IATA коду
   * GET /api/airports/:id
   *
   * Проверяется:
   * - Получение данных аэропорта JFK (John F. Kennedy International Airport)
   * - Корректность IATA кода в ответе
   * - Соответствие названия и города аэропорта
   */
  test('Get specific airport by IATA code', async ({ airportService }) => {
    const response = await airportService.getAirportById(AIRPORTS.JFK)
    const airport = response.data.data

    expect(response.status).toBe(HTTP_STATUS.OK)
    expect(response.data).toHaveProperty('data')

    expect(airport.id).toBe(AIRPORTS.JFK)
    expect(airport.type).toBe(EXPECTED.AIRPORT_TYPE)
    expect(airport.attributes.iata).toBe(AIRPORTS.JFK)

    expect(airport.attributes.name).toContain('Kennedy')
    expect(airport.attributes.city).toBe(CITIES.NEW_YORK)
  })

  /**
   * Тест проверяет вычисление расстояния между двумя аэропортами
   * POST /api/airports/distance
   *
   * Проверяется:
   * - Расчет расстояния между JFK (Нью-Йорк) и LAX (Лос-Анджелес)
   * - Наличие всех единиц измерения: километры, мили, морские мили
   * - Корректность IATA кодов в ответе
   * - Положительные значения расстояний
   */
  test('Calculate distance between two airports', async ({ airportService }) => {
    const response = await airportService.calculateDistance(AIRPORTS.JFK, AIRPORTS.LAX)
    const distanceData = response.data.data
    const { attributes } = distanceData

    expect(response.status).toBe(HTTP_STATUS.OK)
    expect(response.data).toHaveProperty('data')
    expect(distanceData.type).toBe(EXPECTED.DISTANCE_TYPE)

    expect(attributes).toHaveProperty('from_airport')
    expect(attributes).toHaveProperty('to_airport')
    expect(attributes).toHaveProperty('kilometers')
    expect(attributes).toHaveProperty('miles')
    expect(attributes).toHaveProperty('nautical_miles')

    expect(attributes.from_airport.iata).toBe(AIRPORTS.JFK)
    expect(attributes.to_airport.iata).toBe(AIRPORTS.LAX)

    expect(attributes.kilometers).toBeGreaterThan(0)
    expect(attributes.miles).toBeGreaterThan(0)
  })

  /**
   * Тест проверяет корректность работы пагинации при получении списка аэропортов
   * GET /api/airports?page=<number>
   *
   * Проверяется:
   * - Получение двух разных страниц
   * - Размер страницы (должно быть 30 аэропортов на странице)
   * - Различие первого элемента на разных страницах (подтверждение пагинации)
   */
  test('Get airports with pagination', async ({ airportService }) => {
    const page1Response = await airportService.getAllAirports(1)
    const page1Data = page1Response.data.data

    const page2Response = await airportService.getAllAirports(2)
    const page2Data = page2Response.data.data

    expect(page1Response.status).toBe(HTTP_STATUS.OK)
    expect(page2Response.status).toBe(HTTP_STATUS.OK)

    expect(page1Data.length).toBe(EXPECTED.PAGE_SIZE)
    expect(page2Data.length).toBe(EXPECTED.PAGE_SIZE)

    expect(page1Data[0].id).not.toBe(page2Data[0].id)
  })

  /**
   * Тест проверяет получение нескольких аэропортов параллельно и валидацию их структуры
   * GET /api/airports/:id (множественные запросы)
   *
   * Проверяется:
   * - Параллельное выполнение нескольких запросов (Promise.all)
   * - Получение данных для трех крупных аэропортов США
   * - Наличие географических координат (latitude, longitude)
   * - Наличие высоты над уровнем моря (altitude)
   */
  test('Get multiple airports and validate structure', async ({ airportService }) => {
    const airportCodes = [AIRPORTS.LAX, AIRPORTS.ORD, AIRPORTS.DFW]

    const responses = await Promise.all(
      airportCodes.map(code => airportService.getAirportById(code))
    )

    responses.forEach(response => {
      expect(response.status).toBe(HTTP_STATUS.OK)
    })

    responses.forEach((response, index) => {
      const airport = response.data.data
      expect(airport.id).toBe(airportCodes[index])
    })

    responses.forEach(response => {
      const { attributes } = response.data.data
      expect(attributes).toHaveProperty('name')
      expect(attributes).toHaveProperty('latitude')
      expect(attributes).toHaveProperty('longitude')
      expect(attributes).toHaveProperty('altitude')
    })
  })
})
