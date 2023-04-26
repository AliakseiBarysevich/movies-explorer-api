function validateUrl(url) {
  const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Введен некорректный url');
}

module.exports = { validateUrl };
