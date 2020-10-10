import * as _ApolloValidation from "apollo-language-server/lib/errors/validation"

import { loadDependencies } from "@relay-graphql-js/generate-config"

const { KnownArgumentNames, didYouMean, suggestionList, defaultValidationRules } = loadDependencies(
  "apollographql.vscode-apollo",
  (mod: NodeModule) => {
    return {
      defaultValidationRules: mod.require("apollo-language-server/lib/errors/validation")
        .defaultValidationRules as typeof _ApolloValidation,
    }
  }
)
export { KnownArgumentNames, didYouMean, suggestionList, defaultValidationRules }
