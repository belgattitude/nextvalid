import type { ParsableGsspContext } from '../../src';

export const createGsspContext = (
  context: Partial<ParsableGsspContext>
): ParsableGsspContext => {
  const defaultReq: ParsableGsspContext['req'] = {
    method: 'GET',
    headers: {},
    cookies: {},
  };
  const { req = defaultReq, query = {}, locale = undefined } = context;
  return {
    req,
    query,
    locale,
  };
};
