export interface FindAdapter<TQuery, TModel> {
  find(query: TQuery): Promise<TModel[]>;
}
