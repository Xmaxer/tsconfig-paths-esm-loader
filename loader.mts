// @ts-ignore
import { NodeLoaderHooksAPI2 } from 'ts-node/dist/esm.js';
import { resolve as resolveTs } from 'ts-node/esm.mjs';
import * as tsConfigPaths from 'tsconfig-paths';
import { pathToFileURL } from 'url';

const tsConfig = tsConfigPaths.loadConfig();

if (tsConfig.resultType === 'failed') {
  throw new Error(tsConfig.message);
}

const { paths, absoluteBaseUrl } = tsConfig;

const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

const supportedExtensions = ['js', 'mjs'];
const supportedTSExtensions = ['ts', 'mts'];

const supportedExtensionsRegex = new RegExp(
  `(${supportedExtensions.map((ext) => `\\.${ext}`).join('|')})$`,
  'g',
);

export const resolve: NodeLoaderHooksAPI2.ResolveHook = function resolve(
  // @ts-ignore
  specifier,
  // @ts-ignore
  ctx,
  // @ts-ignore
  defaultResolve,
) {
  const supportedExtensionMatch = specifier.match(supportedExtensionsRegex);
  if (supportedExtensionMatch) {
    const supportedExtension = supportedExtensionMatch[0];
    const trimmed = specifier.substring(
      0,
      specifier.lastIndexOf(supportedExtension),
    );
    const match = matchPath(
      trimmed,
      undefined,
      undefined,
      supportedTSExtensions.map((ext) => `.${ext}`),
    );
    if (match) {
      return resolveTs(
        pathToFileURL(`${match}${supportedExtension}`).href,
        ctx,
        defaultResolve,
      );
    }
  }
  return resolveTs(specifier, ctx, defaultResolve);
};

export { load, transformSource } from 'ts-node/esm';
