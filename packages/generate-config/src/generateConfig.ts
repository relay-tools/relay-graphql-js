import * as path from "path";

import { loadDependencies, ModuleFilter } from "./dependencies";
import { generateDirectivesFile } from "./generateDirectivesFile";

const DEFAULTS = {
  localSchemaFile: "./data/schema.graphql",
  src: "./src",
};

export function generateConfig(moduleFilter: ModuleFilter) {
  const { RelayCompilerMain, RelayConfig } = loadDependencies(moduleFilter);
  function loadRelayConfig() {
    if (!RelayConfig) {
      console.log("User has not installed relay-config, so needs manual configuration.");
      return null;
    } else {
      const config = RelayConfig.loadConfig();
      if (!config) {
        console.log("Unable to load user's config from relay-config, so needs manual configuration.");
      }
      return config || null;
    }
  }
  // tslint:disable-next-line: no-shadowed-variable
  function getInputExtensions(relayConfig: ReturnType<typeof loadRelayConfig>) {
    if (!RelayCompilerMain) {
      console.log("Unable to load relay-compiler, so `includes` may need manual configuration.");
    }
    const languagePlugin =
      RelayCompilerMain && RelayCompilerMain.getLanguagePlugin((relayConfig && relayConfig.language) || "javascript");
    return languagePlugin ? languagePlugin.inputExtensions : ["js", "jsx"];
  }
  const relayConfig = loadRelayConfig();
  const extensions = getInputExtensions(relayConfig);
  const directivesFile = generateDirectivesFile();
  // const compatOnlyRules = compat ? [RelayCompatRequiredPageInfoFields, RelayCompatMissingConnectionDirective] : []

  const includesGlobPattern = (inputExtensions: string[]) => `**/*.{graphql,${inputExtensions.join(",")}}`;

  return {
    schema: relayConfig ? relayConfig.schema : DEFAULTS.localSchemaFile,
    directivesFile,
    extensions,
    includesGlobPattern,
    includes: [directivesFile, path.join((relayConfig || DEFAULTS).src, includesGlobPattern(extensions))],
    excludes: relayConfig ? relayConfig.exclude : [],
    relayConfig,
    DEFAULTS,
  };
}
