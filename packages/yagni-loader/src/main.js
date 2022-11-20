
import { parse } from '@yagni-js/yagni-parser';


// eslint-disable-next-line functional/prefer-tacit
export default function loader(content) {

  return parse(content);

}
