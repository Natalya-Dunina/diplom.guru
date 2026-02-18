// API Constants - Airport Gap
// IATA коды аэропортов для тестирования
export const AIRPORTS = {
  JFK: 'JFK', // John F. Kennedy International Airport, New York
  LAX: 'LAX', // Los Angeles International Airport, California
  ORD: 'ORD', // Chicago O'Hare International Airport, Illinois
  DFW: 'DFW', // Dallas/Fort Worth International Airport, Texas
}

// Ожидаемые значения
export const EXPECTED = {
  PAGE_SIZE: 30, // Количество элементов на странице
  AIRPORT_TYPE: 'airport',
  DISTANCE_TYPE: 'airport_distance',
}

// Города для проверки
export const CITIES = {
  NEW_YORK: 'New York',
  LOS_ANGELES: 'Los Angeles',
}

// HTTP статусы
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
}
