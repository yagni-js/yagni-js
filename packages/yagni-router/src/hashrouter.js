
import { always, call, identity, ifElse, isEmpty, isNil, map, or, pipe, pick, pickPath, slice, tap } from '@yagni-js/yagni';


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

export function hashRouter(routes) {
  return tap(
    pipe([
      getHash,
      ifElse(
        or(isNil, isEmpty),
        always('#'),
        identity
      ),
      slice(1),
      matcher(routes),
      map(call(pick('handler'), pick('match')))
    ])
  );
}
