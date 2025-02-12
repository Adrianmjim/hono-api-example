export interface CountAdapter<TQuery> {
  count(query: TQuery): Promise<number>;
}
