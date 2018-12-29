
export function promise(executor) {
  // eslint-disable-next-line better/no-new
  return new Promise(executor);
}

export function resolveP(smth) {
  return Promise.resolve(smth);
}

export function rejectP(smth) {
  return Promise.reject(smth);
}

export function then(onSuccess, onError) {
  return function (thenable) {
    return thenable.then(onSuccess, onError);
  };
}
