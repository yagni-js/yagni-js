
import { always, call, first, identity, ifElse, isEmpty, isNil, or, pipe, pick, pickPath, slice } from '@yagni-js/yagni';


const getHash = pickPath(['target', 'location', 'hash']);

function matcher(routes) {
  return function (hash) {
    return routes.reduce(
      function (acc, route) {
        const match = route.match(hash);
        return match ? acc.concat({match: match, handler: route.handler}) : acc;
      },
      []
    );
  };
}

const callHandler = call(pick('handler'), pick('match'));

export function hashRouter(routes) {
  return pipe([
    getHash,
    ifElse(
      or(isNil, isEmpty),
      always('#'),
      identity
    ),
    slice(1),                   // strip # from hash
    matcher(routes),
    ifElse(
      isEmpty,
      identity,
      pipe([first, callHandler])
    )
  ]);
}
