export interface OutputMapperInterface<T, Output> {
  to_output(to_map: T[]): Output;
}
