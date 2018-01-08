
export function suffix(suff) {
  return function (str) {
    return str + suff;
  };
}

export function prefix(pref) {
  return function (str) {
    return pref + str;
  };
}

export function split(separator) {
  return function (str) {
    return str.split(separator);
  };
}
