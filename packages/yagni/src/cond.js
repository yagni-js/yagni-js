
export function ifElse(cond, fnIf, fnElse) {
  return function (smth) {
    return cond(smth) ? fnIf(smth) : fnElse(smth);
  };
}

export function equals(left) {
  return function (right) {
    return left === right;
  };
}
