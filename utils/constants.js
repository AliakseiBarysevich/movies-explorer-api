const BAD_REQUEST_ERROR_MESSAGE = 'Переданы некорректные данные.';
const INCORRECT_ID_ERROR_MESSAGE = 'Указан некорректный _id.';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация.';
const WRONG_EMAIL_PASSWORD_ERROR_MESSAGE = 'Неправильные почта или пароль.';
const FORBIDDEN_DELETE_MOVIE_MESSAGE = 'Вы не можете удалить чужую карточку фильма.';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Карточка фильма с указанным _id не найдена.';
const NOT_FOUND_USER_ERROR_MESSAGE = 'Пользователь не найден.';
const NOT_FOUND_PAGE_ERROR_MESSAGE = 'Запрашиваемая страница не найдена.';
const DUPLICATE_EMAIL_ERROR_MESSAGE = 'Пользователь с таким email уже существует.';
const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';
const CRASH_TEST_ERROR_MESSAGE = 'Сервер сейчас упадёт.';
const SUCCESSFUL_CARD_DELETION_MESSAGE = 'Карточка фильма удалена.';

const INCORRECT_URL_MESSAGE = 'Введён некорректный URL.';
const INCORRECT_EMAIL_MESSAGE = 'Введён некорректный email.';
const VALIDATION_ERROR_NAME = 'ValidationError';
const CAST_ERROR_NAME = 'CastError';

module.exports = {
  BAD_REQUEST_ERROR_MESSAGE,
  INCORRECT_ID_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  WRONG_EMAIL_PASSWORD_ERROR_MESSAGE,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
  NOT_FOUND_PAGE_ERROR_MESSAGE,
  DUPLICATE_EMAIL_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  CRASH_TEST_ERROR_MESSAGE,
  SUCCESSFUL_CARD_DELETION_MESSAGE,
  INCORRECT_URL_MESSAGE,
  INCORRECT_EMAIL_MESSAGE,
  VALIDATION_ERROR_NAME,
  CAST_ERROR_NAME,
};
