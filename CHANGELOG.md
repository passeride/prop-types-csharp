# 0.5.0

[https://github.com/Creuna-Oslo/prop-types-csharp/pull/41]()

- Complete refactor of propType manipulation and stringification
  - This might cause breakage, in which case please submit an [issue](https://github.com/Creuna-Oslo/prop-types-csharp/issues)
- Adds `generator` option to Node.js API
- Adds support for object literals in `Array` meta

# 0.4.0

- "Major" version bump because it turns out `0.3.6` was a breaking change.
- If you previously relied on classes being generated when running webpack dev server, you should set the `async` option to `true` when running WDS. See [README.md](README.md#webpack)

# 0.3.6

- Adds support for `async` option in webpack plugin
- Removes automatic inference of async through webpack mode