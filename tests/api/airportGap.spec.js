import { test, expect, step } from '../../helpers/fixtures'
import { AirportGapService } from '../../src/services'
import { AIRPORTS, EXPECTED, CITIES, HTTP_STATUS } from '../../helpers'

test.describe('Airport Gap API Tests', () => {
  let airportService

  test.beforeEach(() => {
    airportService = new AirportGapService()
  })

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
  test('Get list of airports', async () => {
    let response, apiData, firstAirport

    await step('Send request to get list of airports', async () => {
      response = await airportService.getAllAirports()
      apiData = response.data.data
    })

    await step('Verify successful response status and data structure', async () => {
      expect(response.status).toBe(HTTP_STATUS.OK)
      expect(response.data).toHaveProperty('data')
      expect(Array.isArray(apiData)).toBeTruthy()
      expect(apiData.length).toBeGreaterThan(0)
    })

    await step('Verify airport object structure', async () => {
      firstAirport = apiData[0]
      expect(firstAirport).toHaveProperty('id')
      expect(firstAirport).toHaveProperty('type', EXPECTED.AIRPORT_TYPE)
      expect(firstAirport).toHaveProperty('attributes')
    })

    await step('Verify required airport attributes', async () => {
      expect(firstAirport.attributes).toHaveProperty('name')
      expect(firstAirport.attributes).toHaveProperty('iata')
      expect(firstAirport.attributes).toHaveProperty('city')
      expect(firstAirport.attributes).toHaveProperty('country')
    })
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
  test('Get specific airport by IATA code', async () => {
    let response, airport

    await step(`Request airport information for ${AIRPORTS.JFK}`, async () => {
      response = await airportService.getAirportById(AIRPORTS.JFK)
      airport = response.data.data
    })

    await step('Verify response status and data structure', async () => {
      expect(response.status).toBe(HTTP_STATUS.OK)
      expect(response.data).toHaveProperty('data')
    })

    await step('Verify that requested airport was retrieved', async () => {
      expect(airport.id).toBe(AIRPORTS.JFK)
      expect(airport.type).toBe(EXPECTED.AIRPORT_TYPE)
      expect(airport.attributes.iata).toBe(AIRPORTS.JFK)
    })

    await step('Verify JFK airport data correctness', async () => {
      expect(airport.attributes.name).toContain('Kennedy')
      expect(airport.attributes.city).toBe(CITIES.NEW_YORK)
    })
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
  test('Calculate distance between two airports', async () => {
    let response, distanceData, attributes

    await step(`Request distance between ${AIRPORTS.JFK} and ${AIRPORTS.LAX}`, async () => {
      response = await airportService.calculateDistance(AIRPORTS.JFK, AIRPORTS.LAX)
      distanceData = response.data.data
      attributes = distanceData.attributes
    })

    await step('Verify successful response and data type', async () => {
      expect(response.status).toBe(HTTP_STATUS.OK)
      expect(response.data).toHaveProperty('data')
      expect(distanceData.type).toBe(EXPECTED.DISTANCE_TYPE)
    })

    await step('Verify all distance measurement units are present', async () => {
      expect(attributes).toHaveProperty('from_airport')
      expect(attributes).toHaveProperty('to_airport')
      expect(attributes).toHaveProperty('kilometers')
      expect(attributes).toHaveProperty('miles')
      expect(attributes).toHaveProperty('nautical_miles')
    })

    await step('Verify IATA codes correctness in response', async () => {
      expect(attributes.from_airport.iata).toBe(AIRPORTS.JFK)
      expect(attributes.to_airport.iata).toBe(AIRPORTS.LAX)
    })

    await step('Verify that distances are greater than zero', async () => {
      expect(attributes.kilometers).toBeGreaterThan(0)
      expect(attributes.miles).toBeGreaterThan(0)
    })
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
  test('Get airports with pagination', async () => {
    let page1Response, page2Response, page1Data, page2Data

    await step('Get first page of airports list', async () => {
      page1Response = await airportService.getAllAirports(1)
      page1Data = page1Response.data.data
    })

    await step('Get second page of airports list', async () => {
      page2Response = await airportService.getAllAirports(2)
      page2Data = page2Response.data.data
    })

    await step('Verify both requests are successful', async () => {
      expect(page1Response.status).toBe(HTTP_STATUS.OK)
      expect(page2Response.status).toBe(HTTP_STATUS.OK)
    })

    await step(`Verify page size (${EXPECTED.PAGE_SIZE} elements)`, async () => {
      expect(page1Data.length).toBe(EXPECTED.PAGE_SIZE)
      expect(page2Data.length).toBe(EXPECTED.PAGE_SIZE)
    })

    await step('Verify that data on different pages differs', async () => {
      const firstAirportPage1 = page1Data[0].id
      const firstAirportPage2 = page2Data[0].id
      expect(firstAirportPage1).not.toBe(firstAirportPage2)
    })
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
  test('Get multiple airports and validate structure', async () => {
    const airportCodes = [AIRPORTS.LAX, AIRPORTS.ORD, AIRPORTS.DFW]
    let responses

    await step(`Send parallel requests for airports: ${airportCodes.join(', ')}`, async () => {
      responses = await Promise.all(
        airportCodes.map(code => airportService.getAirportById(code))
      )
    })

    await step('Verify all requests are successful', async () => {
      responses.forEach(response => {
        expect(response.status).toBe(HTTP_STATUS.OK)
      })
    })

    await step('Verify IATA codes correctness in responses', async () => {
      responses.forEach((response, index) => {
        const airport = response.data.data
        expect(airport.id).toBe(airportCodes[index])
      })
    })

    await step('Verify required attributes (coordinates, altitude)', async () => {
      responses.forEach(response => {
        const attributes = response.data.data.attributes
        expect(attributes).toHaveProperty('name')
        expect(attributes).toHaveProperty('latitude')
        expect(attributes).toHaveProperty('longitude')
        expect(attributes).toHaveProperty('altitude')
      })
    })
  })
})
