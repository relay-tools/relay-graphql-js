import type { ApolloConfigFormat } from "apollo-language-server/lib/config"
import type { ValidationRule } from "graphql"

import { generateConfig as generateConfigFromRelay } from "@relay-graphql-js/generate-config"

import { defaultValidationRules, extensionId } from "./dependencies"

const ValidationRulesToExcludeForRelay = [
  "KnownArgumentNames",
  "NoUndefinedVariables",
  "VariablesInAllowedPosition",
  "NoMissingClientDirectives",
]

export function generateConfig(compat: boolean = false) {
  const { schema, include, exclude, includesGlobPattern, directivesFile, validationRules } = generateConfigFromRelay(
    extensionId,
    compat
  )

  const config: ApolloConfigFormat = {
    client: {
      service: {
        name: "local",
        localSchemaFile: schema,
      },
      validationRules: [
        ...validationRules,
        ...defaultValidationRules.filter(
          (rule: ValidationRule) => !ValidationRulesToExcludeForRelay.some((name) => rule.name.startsWith(name))
        ),
      ],
      includes: [...include, directivesFile],
      excludes: exclude,
      tagName: "graphql",
    },
  }

  return { config, directivesFile, includesGlobPattern }
}
