// @ts-check
'use strict';

const { resolve } = require('path');

export const globalCachePath = resolve(`${__dirname}/.cache`);

/**
 * @param {string} packageName
 * @returns string
 */
function sanitize(packageName) {
  return packageName.replace('/', '.').replace(/[^a-z0-9.@_-]+/gi, '-');
}

/**
 * @param {string} packageName
 * @returns string
 */
export function getJestCachePath(packageName) {
  return `${globalCachePath}/jest/${sanitize(packageName)}`;
}
