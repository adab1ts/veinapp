
import * as path from 'path';

const ROOT = path.resolve(__dirname, '../..');

/**
 * Returns an absolute path built from path fragments
 * @param args Path fragments
 */
function root (...args): string {
  return path.join.apply(path, [ROOT, ...args]);
}

export { root };
