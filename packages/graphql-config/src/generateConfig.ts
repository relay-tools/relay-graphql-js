import { ValidationRule } from "graphql";
import type { IGraphQLProject } from "graphql-config";

import { generateConfig as generateConfigFromRelay } from "@relay-graphql-js/generate-config";

export function generateConfig(compat?: boolean, customValidationRules: ValidationRule[] = []) {
  const { schema, include, exclude, includesGlobPattern, directivesFile, validationRules } = generateConfigFromRelay(
    "graphql.vscode-graphql",
    compat
  );

  const config: IGraphQLProject = {
    schema: [schema, directivesFile],
    include,
    exclude,
    documents: [...include],
    extensions: {
      customValidationRules: [...validationRules, ...customValidationRules],
    },
  };

  return { config, directivesFile, includesGlobPattern };
}
