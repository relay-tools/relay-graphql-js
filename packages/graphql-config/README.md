# `@relay-graphql-js/graphql-config`

[![npm](https://img.shields.io/npm/v/vscode-apollo-relay.svg)](https://www.npmjs.com/package/vscode-apollo-relay)
[![build](https://img.shields.io/travis/relay-tools/vscode-apollo-relay/master.svg)](https://travis-ci.org/relay-tools/vscode-apollo-relay/builds)

Simple compatibility layer for transforming [`graphql-config`](https://graphql-config.com) to relay config format. 

Features:

- Read all user configuration from [relay-config], if the project is setup with it.
- Provides definitions for all Relay directives for validation and auto-completion purposes.
- Provides validation of `@argumentDefinitions` and `@arguments` directives.

[Changelog](https://github.com/relay-tools/relay-graphql-js/blob/master/packages/graphql-config/CHANGELOG.md)

## Install

```sh
# using npm
npm install --save-dev @relay-graphql-js/graphql-config

# using yarn
yarn add --dev @relay-graphql-js/graphql-config
```

## Usage

In your `graphql.config.js` file:

```js
const { config } = require("@relay-graphql-js/graphql-config").generateConfig()
module.exports = config
```
