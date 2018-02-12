
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

export function replace(from, to) {
  return function (str) {
    return str.replace(from, to);
  };
}

export function slice(pos) {
  return function (str) {
    return str.slice(pos);
  };
}

export function slice2(start, end) {
  return function (str) {
    return str.slice(start, end);
  };
}

export function repeat(str) {
  return function (count) {
    // NB. ES2015 feature
    return str.repeat(count);
  };
}
