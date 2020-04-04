const nextCharForNumberStr = str => {
    const trimmed = str.trim()
    const number = parseInt(trimmed)
    const nextNumber = number + 1
    return String.fromCharCode(nextNumber)
}

const Box = x => 
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const nextCharForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(p => parseInt(p))
    .map(i => i + 1)
    .map(c => String.fromCharCode(c))
    .fold(a => a)

const result = nextCharForNumberString(' 66 ')

const moneyToFloat = str =>
    Box(str.replace(/\$/g, ''))
    .map(s => parseFloat(s))

const percentToFloat = str => 
    Box(str.replace(/\%/g, ''))
    .map(s => parseFloat(s))
    .map(n => n * 0.01)

const applyDiscount = (price, discount) => 
    moneyToFloat(price)
    .fold(cost => 
     percentToFloat(discount)
     .fold(saving =>
      cost-cost*saving ))

const result = applyDiscount('$5.00', '20%')
console.log(result)
