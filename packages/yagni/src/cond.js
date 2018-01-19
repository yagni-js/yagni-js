
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

export function and(left, right) {
  return function (smth) {
    return left(smth) && right(smth);
  };
}

export function or(left, right) {
  return function (smth) {
    return left(smth) || right(smth);
  };
}
