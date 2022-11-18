import type { ParsableGsspContext } from '../../src';

export const createGsspContext = (
  context: Partial<ParsableGsspContext>
): ParsableGsspContext => {
  return {
    ...({
      req: {
        method: 'GET',
        cookies: {},
        headers: {},
      },
      query: {},
      locale: undefined,
    } as ParsableGsspContext),
    ...context,
  };
};
