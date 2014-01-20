module.exports = function(tokens) {
  return this.replace(
    /\{\{([^{}]*)\}\}/g,
    function (match) {
      token = match.slice(2,-2);
      return typeof tokens[token] === 'string' || typeof tokens[token] === 'number' ? tokens[token] : match;
    })
}
