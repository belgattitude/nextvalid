import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

export const zodStringToInt = (schema: ZodTypeAny) => {
  const a = z.preprocess((v): number | undefined => {
    if (typeof v === 'string') {
      return Number.parseInt(v, 10);
    } else if (typeof v === 'number') {
      return v;
    }
    return undefined;
  }, schema);
  console.log(a);
  return a;
};

/*
export const zodStringToInt = (v: unknown) => {
  return z.transform((val) => {
    if (typeof v === 'string') {
      return parseInt(v, 10);
    }
    if (typeof v === 'number') return v;
    return undefined;
  });
};
*/
