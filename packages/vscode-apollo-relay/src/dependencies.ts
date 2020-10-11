import * as _ApolloValidation from "apollo-language-server/lib/errors/validation"

import { loadDependencies } from "@relay-graphql-js/generate-config"

const extensionId = "apollographql.vscode-apollo"
const { defaultValidationRules } = loadDependencies(extensionId, (mod: NodeModule) => {
  return {
    defaultValidationRules: mod.require("apollo-language-server/lib/errors/validation")
      .defaultValidationRules as typeof _ApolloValidation,
  }
})
export { defaultValidationRules, extensionId }
