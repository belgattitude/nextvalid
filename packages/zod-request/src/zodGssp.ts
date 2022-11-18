import type { IErrorHandler } from './error';
import type {
  ParsableRequest,
  RequestSchema,
  ServerSidePropsSchema,
} from './types';
import { ZodServerSideProps } from './ZodServerSideProps';

export const zodGssp = <
  R extends ParsableRequest,
  S extends Partial<ServerSidePropsSchema>
>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodServerSideProps.create({ schema, errorHandler });
};
