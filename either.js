// Either = Right || Left
const fs = require("fs");

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (_, g) => g(x),
  inspect: () => `Right({$x})`,
});

const Left = (x) => ({
  chain: (_) => Left(x),
  map: (_) => Left(x),
  fold: (f, _) => f(x),
  inspect: () => `Left({$x})`,
});

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const findColor = (name) => {
  const colors = {
    red: "ff0000",
    green: "00ff00",
    black: "0000ff",
    white: "000000",
  };

  return fromNullable(colors[name]);
};

const result = findColor("red")
  .map((c) => c.toUpperCase())
  .fold(
    (_) => "color not found",
    (v) => v
  );

console.log(result)

// const getPort = () => {
//   try {
//     const str = fs.readFileSync("config.json")
//     const config = JSON.parse(str);
//     return config.port
//   } catch(e){
//     return 8000
//   }
// };

const getPort = () =>
  tryCatch(() => fs.readFileSync("config.json"))
    .chain((s) => tryCatch(() => JSON.parse(s)))
    .fold(
      (_) => 8000,
      (c) => c.port
    );
const res = getPort();

console.log(res);
