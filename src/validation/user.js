function isEmailValid(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}

module.exports = isEmailValid;
