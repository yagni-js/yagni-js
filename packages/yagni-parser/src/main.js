
import { getParser } from './sax.js';


export function parse(source) {
  const parser = getParser();
  const doc = parser.parse(source)
  return doc;
}
