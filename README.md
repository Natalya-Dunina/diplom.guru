# diplom.guru

[![Playwright UI](https://github.com/Natalya-Dunina/diplom.guru/actions/workflows/playwright.yml/badge.svg)](https://github.com/Natalya-Dunina/diplom.guru/actions/workflows/playwright.yml)

Проект автотестов для UI и API.

**UI тесты**: https://realworld.qa.guru/

**API тесты**: https://airportgap.com/

**Allure отчёты**:
- UI: https://Natalya-Dunina.github.io/diplom.guru/ui/
- API: https://Natalya-Dunina.github.io/diplom.guru/api/

**Используемые паттерны**

*UI тесты:*
- `Page Object Model` для страниц и компонентов UI
- Паттерн `Builder` для тестовых данных
- `fixtures` Playwright для общего сетапа (фикстура `app`)

*API тесты:*
- `Service Pattern` - вся HTTP-логика в сервисах
- `Axios` для HTTP-запросов
- Константы для тестовых данных (IATA коды, HTTP статусы)
- Деструктуризация для читаемости (JSON:API формат)

*Общее:*
- Allure для отчётности с `allure.step()`
- CI/CD через GitHub Actions + GitHub Pages (Allure отчёты)
- Telegram‑уведомления из CI (Allure notifications)
- Паттерн `Barrel` для чистых импортов

**Структура проекта**
- `src/pageObject/` - Page Object'ы страниц и компонентов (UI)
- `src/services/` - API сервисы с HTTP-логикой
- `tests/ui/` - UI‑тесты (Conduit/RealWorld)
- `tests/api/` - API‑тесты (Airport Gap)
- `helpers/` - фикстуры, билдеры и константы
- `notifications/` - конфиги для Telegram-уведомлений

**Локальный запуск**

Установка:
```bash
npm ci
npx playwright install --with-deps
```

Запуск тестов:
```bash
npm run ui          # Запуск UI тестов
npm run api         # Запуск API тестов
npm run test        # Запуск всех тестов (UI + API)
```

Allure отчёт:
```bash
npm run allureGenerate   # Генерация отчёта
npm run allureOpen       # Открыть отчёт
npm run allureClean      # Очистить результаты
```

**CI/CD (GitHub Actions)**
Файл workflow: `.github/workflows/playwright.yml`

Два независимых job:

**UI tests** (`ui-tests`):
1. Устанавливает зависимости и браузеры
2. Запускает UI‑тесты (`chromium-ui`)
3. Генерирует Allure отчёт
4. Публикует в GitHub Pages: `/ui/`
5. Отправляет Telegram‑уведомление
6. Сохраняет артефакт `playwright-report`

**API tests** (`api-tests`):
1. Устанавливает зависимости
2. Запускает API‑тесты (`api`)
3. Генерирует Allure отчёт
4. Публикует в GitHub Pages: `/api/`
5. Отправляет Telegram‑уведомление
6. Сохраняет артефакт `playwright-report-api`

Allure отчёты:
- UI: `https://Natalya-Dunina.github.io/diplom.guru/ui/`
- API: `https://Natalya-Dunina.github.io/diplom.guru/api/`

---

## API тесты (Airport Gap)

**5 автотестов** для REST API https://airportgap.com/

**Покрытие:**
1. `GET /api/airports` - получение списка всех аэропортов
2. `GET /api/airports/:id` - получение конкретного аэропорта по IATA коду
3. `POST /api/airports/distance` - вычисление расстояния между аэропортами
4. `GET /api/airports?page=N` - пагинация списка аэропортов
5. `GET /api/airports/:id` (множественные) - параллельные запросы и валидация структуры

**Технические детали:**
- JSON:API формат ответов
- Деструктуризация для упрощения `response.data.data` → `const { data } = response.data`
- Все HTTP-запросы через сервис `AirportGapService`
- Каждый метод сервиса обернут в `allure.step()` для детальной отчетности
- Константы (IATA коды, HTTP статусы) вынесены в `helpers/constants.js`
- Barrel pattern для чистых импортов
