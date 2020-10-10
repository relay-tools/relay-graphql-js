import type { ApolloConfigFormat } from "apollo-language-server/lib/config"
import type { ValidationRule } from "graphql"

import { generateConfig as generateConfigFromRelay } from "@relay-graphql-js/generate-config"
import {
  RelayArgumentsOfCorrectType,
  RelayCompatMissingConnectionDirective,
  RelayCompatRequiredPageInfoFields,
  RelayDefaultValueOfCorrectType,
  RelayKnownVariableNames,
  RelayNoUnusedArguments,
  RelayVariablesInAllowedPosition,
} from "@relay-graphql-js/validation-rules"

import { defaultValidationRules } from "./dependencies"
import { RelayKnownArgumentNames } from "./RelayKnownArgumentNames"

const ValidationRulesToExcludeForRelay = [
  "KnownArgumentNames",
  "NoUndefinedVariables",
  "VariablesInAllowedPosition",
  "NoMissingClientDirectives",
]

export function generateConfig(compat: boolean = false) {
  const { schema, includes, excludes, includesGlobPattern, directivesFile } = generateConfigFromRelay(
    "apollographql.vscode-apollo"
  )
  const compatOnlyRules = compat ? [RelayCompatRequiredPageInfoFields, RelayCompatMissingConnectionDirective] : []

  const config: ApolloConfigFormat = {
    client: {
      service: {
        name: "local",
        localSchemaFile: schema,
      },
      validationRules: [
        RelayKnownArgumentNames,
        RelayKnownVariableNames,
        RelayVariablesInAllowedPosition,
        RelayArgumentsOfCorrectType,
        RelayDefaultValueOfCorrectType,
        RelayNoUnusedArguments,
        ...compatOnlyRules,
        ...defaultValidationRules.filter(
          (rule: ValidationRule) => !ValidationRulesToExcludeForRelay.some((name) => rule.name.startsWith(name))
        ),
      ],
      includes,
      excludes,
      tagName: "graphql",
    },
  }

  return { config, directivesFile, includesGlobPattern }
}
