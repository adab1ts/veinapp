
type Formatter = (o: any, keys: string[], patterns?: string[]) => any;

interface FormatTask {
  fn: Formatter;
  keys: string[];
  patterns?: string[];
}

/**
 * Applies a list of string transformations to an object's properties
 * @param tasks Array of transformations
 */
function format(tasks: FormatTask[]): any {
  return (obj) => tasks.reduce((o: any, t: FormatTask) => t.fn(o, t.keys, t.patterns), obj);
}

export { Formatter, FormatTask, format };
