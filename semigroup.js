// Anything with a concat method (combine) => Semigroup
// Semigroup with neutral element that act as an identity => Monoid
// 1 + 0 = 1
// x + 0 = x
// false && true = false
// true && true = true

const { Map } = require("immutable-ext")


const Sum = x => ({
    x,
    concat: ({x:y}) => Sum (x + y),
    inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)

// const res = Sum(1).concat(Sum(2))

const All = x => ({
    x,
    concat: ({x:y}) => All (x && y),
    inspect: () => `All(${x})`
})

All.empty = () => All(true)
// const res = All(true).concat(All(true)) // false

const First = x => ({
    x,
    concat: (_) => First (x),
    inspect: () => `First(${x})`
})

// const res = First('abc').concat(First('whatever')) // 'true'
// console.log(res)

const acc1 = Map( { 
    name: First("Mike"),
    isPaid: All(true),
    points: Sum(20),
    friends: ["Kevin", "Jordan"]
})

const acc2 = Map( { 
    name: First("Mike"),
    isPaid: All(false),
    points: Sum(10),
    friends: ["Henry"]
})

const res = acc1.concat(acc2)

// console.log(res.toJS());
const sum = xs => xs.reduce((acc, val) => acc + val, 0)
sum([1,2]) // 3
sum([]) // 0


const all = xs => xs.reduce((acc, val) => acc && val, true)
all([true, false]) //false
all([]) // true

const first = xs => xs.reduce((acc, _) => acc)
console.log(first([1,2])) // 1
console.log(first([])) // ERROR

// first is a semigroup so it is not a same operation but sum and all are monoids so are safe even if empty


