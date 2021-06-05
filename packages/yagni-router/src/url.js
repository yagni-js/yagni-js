
import { match } from '@yagni-js/yagni';


export function url(path, handler) {
  return {path: path, handler: handler, match: match(path)};
}
