
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

export function camelize(s) {
  return s.replace(/-([a-z])/g, function (m, x) { return x.toUpperCase(); });
}

export function test(regexp) {
  return function (str) {
    return regexp.test(str);
  };
}
