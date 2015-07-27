//register helper functions for Handlebars.js

var initHandlebarsHelpers;



initHandlebarsHelpers = function() {

  return Handlebars.registerHelper('ifCond', function(firstVal, operator, secondVal, options) {
    switch (operator) {
      case '==':
      case '===':
        if (firstVal === secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '!=':
        if (firstVal !== secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '<':
        if (firstVal < secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '<=':
        if (firstVal <= secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '>':
        if (firstVal > secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '>=':
        if (firstVal >= secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '&&':
        if (firstVal && secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      case '||':
        if (firstVal || secondVal) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      default:
        return options.inverse(this);
    }
  });
};

initHandlebarsHelpers()
  



  // initHandlebarsHelpers = ->

  //   Handlebars.registerHelper 'getKeyValue', (name, key, block) ->
  //     block.data.root[name][key]


  //   Handlebars.registerHelper 'ifCond', (firstVal, operator, secondVal, options)->
  //     switch operator
  //       when '==', '==='
  //         return if firstVal is secondVal then options.fn @ else options.inverse @
  //       when '!='
  //         return if firstVal != secondVal then options.fn @ else options.inverse @
  //       when '<'
  //         return if firstVal <  secondVal then options.fn @ else options.inverse @
  //       when '<='
  //         return if firstVal <= secondVal then options.fn @ else options.inverse @
  //       when '>'
  //         return if firstVal >  secondVal then options.fn @ else options.inverse @
  //       when '>='
  //         return if firstVal >= secondVal then options.fn @ else options.inverse @
  //       when '&&'
  //         return if firstVal && secondVal then options.fn @ else options.inverse @
  //       when '||'
  //         return if firstVal || secondVal then options.fn @ else options.inverse @
  //       else
  //         return options.inverse @

  //   Handlebars.registerHelper 'length', (obj) ->
  //     return Object.keys(obj).length

  //   Handlebars.registerHelper 'loop', (fromNumber, toNumber, block) ->
  //     (block.fn(i) for i in [fromNumber...toNumber+1]).join('')

  //   Handlebars.registerHelper 'money', (price) ->
  //     return numeral(price).format()

  //   Handlebars.registerHelper 'pluralize', (number, titles) ->
  //     cases = [2, 0, 1, 1, 1, 2]
  //     titles.split(',')[(if (number % 100 > 4 and number % 100 < 20) then 2 else cases[(if (number % 10 < 5) then number % 10 else 5)])]

  //   Handlebars.registerHelper 'set', (name, value, block) ->
  //     block.data.root[name] = value
  //     ''
   
  //   Handlebars.registerHelper 'setCalculated', (name, value1, operator, value2, block) ->
  //     switch operator
  //       when '+'
  //         block.data.root[name] = Math.round value1 + value2
  //       when '-'
  //         block.data.root[name] = Math.round value1 - value2
  //       when '*'
  //         block.data.root[name] = Math.round value1 * value2
  //       when '/'
  //         block.data.root[name] = Math.round value1 / value2
  //       when '%'
  //         block.data.root[name] = Math.round value1 % value2
  //     ''

  //   Handlebars.registerHelper 'useCalculated', (firstVal, operator, secondVal, options)->
  //     switch operator
  //       when '+'
  //         return Math.round firstVal + secondVal
  //       when '-'
  //         return Math.round firstVal - secondVal
  //       when '*'
  //         return Math.round firstVal * secondVal
  //       when '/'
  //         return Math.round firstVal / secondVal
  //       else
  //         return options.inverse @

  
  //   Handlebars.registerHelper 'setJSON', (name, data, block) ->
  //     block.data.root[name] = JSON.parse(data)
  //     ''

  //   Handlebars.registerHelper 'times', (n, block) ->
  //     (block.fn(i) for i in [1...n+1]).join('')

  //   Handlebars.registerHelper 'useGlobalVar', (varName, block) ->
  //     block.data.root[varName] = window[varName]
  //     ''

  //   Handlebars.registerHelper 'useUrlParam', (name, block) ->
  //     params = new URI().search(true)
  //     block.data.root[name] = params[name] if params[name] != undefined
  //     ''

  // initHandlebarsHelpers()