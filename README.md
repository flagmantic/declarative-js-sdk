# First Kind Declarative SDK

This library provides a typescript declarative SDK for defining projects, environments, and feature flags.

Create a node project with:

```sh
mkdir declarative
cd declarative
npm init
```

Then run

```sh
npm i @firstkind/declarative
```

Then create an `index.js` file with the following contents and run with `node index.js`

```typescript
import { Client } from "@firstkind/declarative";

const client = new Client("<your admin api key>");

client.applySync({
  version: 1,
  projects: [
    {
      name: "My First Project",
      key: "my-first-project",
      feature_flags: [
        {
          key: "my-first-flag",
          name: "My First Flag",
          description: null,
          tags: ["redesign", "apples", "food"],
          variations: {
            "0": { label: "Disabled", flag: { BooleanFlag: false } },
            "1": { label: "Enabled", flag: { BooleanFlag: true } },
            "2": {
              label: "Enabled JSON Flag",
              flag: {
                JsonFlag: { foo: "bar" },
              },
            },
          },
          is_frontend: true,
          environments: {
            development: {
              enabled: true,
              targeting: [
                {
                  name: "Example Target 1",
                  formula: {
                    Or: [
                      { Pure: { UserId: { user_ids: ["1234"] } } },
                      { Pure: { UserId: { user_ids: ["4321"] } } },
                    ],
                  },
                  variation: 1,
                  starts_at: "2018-11-13T20:20:39Z",
                  expires_at: "2018-11-13T20:20:39Z",
                },
              ],
              enabled_default_variation: 0,
              disabled_variation: 0,
            },
            production: {
              enabled: false,
              targeting: null,
              enabled_default_variation: 0,
              disabled_variation: 0,
            },
            staging: {
              enabled: false,
              targeting: null,
              enabled_default_variation: 0,
              disabled_variation: 0,
            },
          },
        },
      ],
    },
  ],
});
```
