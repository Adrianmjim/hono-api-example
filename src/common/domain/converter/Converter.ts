export interface Converter<TInput, TOutput, TContext = void> {
  convert(input: TInput, context: TContext): TOutput;
}
