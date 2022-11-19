import type { IErrorHandler } from './error';
import type { ParsableGsspContext, ServerSidePropsSchema } from './types';
import { ZodServerSideProps } from './ZodServerSideProps';

export const zodGssp = <
  R extends ParsableGsspContext,
  S extends Partial<ServerSidePropsSchema>
>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodServerSideProps.create({ schema, errorHandler });
};
