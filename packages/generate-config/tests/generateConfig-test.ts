import type { ValidationRule } from "graphql";
import { Config } from "relay-compiler/lib/bin/RelayCompilerMain";
import { generateConfig } from "../src/index";

jest.mock("cosmiconfig", () => () => ({
  searchSync: () => ({
    config: {
      schema: "path/to/schema.graphql",
      src: "path/to/src-root",
      exclude: ["path/to/exclude"],
    } as Config,
  }),
}));

const moduleId = "graphql.vscode-graphql";

describe(generateConfig, () => {
  xdescribe("when user does not use relay-config", () => {
    it("uses a default schema file", () => {
      jest.mock("relay-config", () => ({ loadConfig: () => null }));
      const config = generateConfig(moduleId);
      expect(config.schema).toEqual("./data/schema.graphql");
    });

    it("uses a default source root", () => {
      jest.mock("relay-config", () => ({ loadConfig: () => null }));
      const config = generateConfig(moduleId);
      expect(config.include).toEqual("./src/**/*.{graphql,js,jsx}");
    });
  });

  it("specifies the schema file", () => {
    const config = generateConfig(moduleId);
    expect(config.schema).toEqual("path/to/schema.graphql");
  });

  it("specifies the source files to include", () => {
    const config = generateConfig(moduleId);
    expect(config.include).toContain("path/to/src-root/**/*.{graphql,js,jsx}");
  });

  it("specifies the source files to exclude", () => {
    const config = generateConfig(moduleId);
    expect(config.exclude).toContain("path/to/exclude");
  });

  it("excludes validation rules that are incompatible with Relay", () => {
    const config = generateConfig(moduleId);
    const rules = config.validationRules as ValidationRule[];
    expect(rules.map(({ name }) => name)).not.toContain("NoUndefinedVariablesRule");
  });

  it("includes the RelayUnknownArgumentNames validation rule", () => {
    const config = generateConfig(moduleId);
    const rules = config.validationRules as ValidationRule[];
    expect(rules.map(({ name }) => name)).toContain("RelayKnownArgumentNames");
  });

  it.todo("specifies the source files to include with a different language plugin");
});
