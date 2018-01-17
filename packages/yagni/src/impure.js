
export function tap(sideEffect) {
  return function (smth) {
    // NB. side effect
    // eslint-disable-next-line fp/no-unused-expression
    const r = sideEffect(smth);
    return smth;
  };
}

export function mutate(subj, attr, value) {
  // eslint-disable-next-line fp/no-mutation
  subj[attr] = value;
  return subj;
}
