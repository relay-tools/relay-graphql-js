/**
 * Ok, so in this module we find an ancestral module that resides inside vscode extension, as we need to require
 * dependencies used by the vscode extension from the same dependency tree in order to not lead to conflicts where
 * e.g. graphql-js parts come from different modules (i.e. the user's node_modules).
 */

import * as _GraphQL from "graphql";
import * as _RelayCompilerMain from "relay-compiler/lib/bin/RelayCompilerMain";
import * as _RelayConfig from "relay-config";

export type ModuleFilterFunction = (module: NodeModule) => boolean;
export type ModuleFilter = string | ModuleFilterFunction;

const filterModules = (mod: NodeModule, moduleFilter: ModuleFilter) => {
  if (!mod) {
    return false;
  }
  if (typeof moduleFilter === "function") {
    return moduleFilter(mod);
  }
  return !mod.id.toLowerCase().includes(moduleFilter);
};

function moduleFromDependencyModules(moduleFilter: ModuleFilter) {
  let mod = module;
  if (typeof jest === "undefined") {
    while (filterModules(mod, moduleFilter)) {
      mod = Object.values(require.cache).filter((m) => m.children.includes(module))[0] ?? null;
    }
    if (mod === null) {
      throw new Error(`Unable to find ${moduleFilter}'s node_modules`);
    }
  }
  return mod;
}

export const loadDependencies = (moduleFilter: ModuleFilter, loadAdditional?: (mod: NodeModule) => any) => {
  const mod = moduleFromDependencyModules(moduleFilter);
  const {
    BREAK,
    GraphQLError,
    parseType,
    visit,
    isNonNullType,
    valueFromAST,
    isTypeSubTypeOf,
    getNullableType,
    typeFromAST,
    GraphQLNonNull,
    GraphQLObjectType,
    visitWithTypeInfo,
    isInputType,
    TypeInfo,
  } = mod.require("graphql") as typeof _GraphQL;

  let relayConfigMod: typeof _RelayConfig | null = null;
  try {
    // tslint:disable-next-line: no-var-requires
    relayConfigMod = require("relay-config");
  } catch {
    // ignore
  }
  const RelayConfig = relayConfigMod;

  let relayCompilerMainMod: typeof _RelayCompilerMain | null = null;
  try {
    // relay-compiler v6
    // tslint:disable-next-line: no-var-requires
    relayCompilerMainMod = require("relay-compiler/lib/bin/RelayCompilerMain");
  } catch {
    try {
      // relay-compiler v5
      // tslint:disable-next-line: no-var-requires
      relayCompilerMainMod = require("relay-compiler/lib/RelayCompilerMain");
    } catch {
      // ignore
    }
  }
  const RelayCompilerMain = relayCompilerMainMod;
  return {
    ...(loadAdditional ? loadAdditional(mod) : {}),
    RelayConfig,
    RelayCompilerMain,
    BREAK,
    GraphQLError,
    parseType,
    visit,
    isNonNullType,
    valueFromAST,
    isTypeSubTypeOf,
    getNullableType,
    typeFromAST,
    GraphQLNonNull,
    GraphQLObjectType,
    visitWithTypeInfo,
    isInputType,
    TypeInfo,
  };
};
