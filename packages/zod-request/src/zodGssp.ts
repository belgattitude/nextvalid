import type { IErrorHandler } from './error';
import type { ServerSidePropsSchema } from './types';
import { ZodServerSideProps } from './ZodServerSideProps';

export const zodGssp = <S extends Partial<ServerSidePropsSchema>>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodServerSideProps.create({ schema, errorHandler });
};
