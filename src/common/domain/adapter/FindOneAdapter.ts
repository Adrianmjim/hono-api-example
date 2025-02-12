export interface FindOneAdapter<TQuery, TModel> {
  findOne(query: TQuery): Promise<TModel | undefined>;
}
