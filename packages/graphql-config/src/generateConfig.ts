import { ValidationRule } from "graphql";
import type { GraphQLProjectConfig } from "graphql-config";

import { generateConfig as generateConfigFromRelay } from "@relay-graphql-js/generate-config";
import {
  RelayArgumentsOfCorrectType,
  RelayCompatMissingConnectionDirective,
  RelayCompatRequiredPageInfoFields,
  RelayDefaultValueOfCorrectType,
  RelayKnownVariableNames,
  RelayNoUnusedArguments,
  RelayVariablesInAllowedPosition,
} from "@relay-graphql-js/validation-rules";

export function generateConfig(compat: boolean = false, customValidationRules: ValidationRule[] = []) {
  const { schema, includes, excludes, includesGlobPattern, directivesFile } = generateConfigFromRelay(
    "graphql.vscode-graphql"
  );
  const compatOnlyRules = compat ? [RelayCompatRequiredPageInfoFields, RelayCompatMissingConnectionDirective] : [];

  const config = {
    schema: [schema, directivesFile],
    includes,
    excludes,
    documents: includes,
    extensions: {
      customValidationRules: [
        RelayKnownVariableNames,
        RelayVariablesInAllowedPosition,
        RelayArgumentsOfCorrectType,
        RelayDefaultValueOfCorrectType,
        RelayNoUnusedArguments,
        ...compatOnlyRules,
        ...customValidationRules,
      ],
    },
  } as Partial<GraphQLProjectConfig>;

  return { config, directivesFile, includesGlobPattern };
}
