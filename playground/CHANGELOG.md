# Changelog


## v0.3.0


### 🚀 Enhancements

- Request URL Builder ([#4](https://github.com/Kasparas-G55/nodesera/pull/4))

### 🩹 Fixes

- **ci:** Fix build job ([9749034](https://github.com/Kasparas-G55/nodesera/commit/9749034))
- Change package.json version ([a12530f](https://github.com/Kasparas-G55/nodesera/commit/a12530f))
- Paysera's public.key not included when publishing module ([#9](https://github.com/Kasparas-G55/nodesera/pull/9))

### 💅 Refactors

- Pass `invalidParams` to `verifyRequestParams` by reference and throw inside `encodeURLBase64` ([47e1bcb](https://github.com/Kasparas-G55/nodesera/commit/47e1bcb))
- ⚠️  Replace class with function in `Nodesera.ts` ([#8](https://github.com/Kasparas-G55/nodesera/pull/8))
- ⚠️  Simplify code by merging `requestBuilder.ts` in to `createNodesera` function ([#10](https://github.com/Kasparas-G55/nodesera/pull/10))

### 📖 Documentation

- Small `readme` changes ([#3](https://github.com/Kasparas-G55/nodesera/pull/3))

### 🏡 Chore

- Add `release-please` workflow ([#2](https://github.com/Kasparas-G55/nodesera/pull/2))
- Remove regexp check from `requestValidation` didn't really seem necessary in my opinion. ([5d383d2](https://github.com/Kasparas-G55/nodesera/commit/5d383d2))
- **release:** V0.2.0 ([#7](https://github.com/Kasparas-G55/nodesera/pull/7))
- **release:** V0.2.1 ([bd8f8c5](https://github.com/Kasparas-G55/nodesera/commit/bd8f8c5))

### ✅ Tests

- Separate `validation` from `requestBuilder` test: exceeding request params max length ([bc2aa15](https://github.com/Kasparas-G55/nodesera/commit/bc2aa15))

### 🤖 CI

- Chore: update build workflow ([#5](https://github.com/Kasparas-G55/nodesera/pull/5))
- Rename job ([07f332a](https://github.com/Kasparas-G55/nodesera/commit/07f332a))

#### ⚠️ Breaking Changes

- ⚠️  Replace class with function in `Nodesera.ts` ([#8](https://github.com/Kasparas-G55/nodesera/pull/8))
- ⚠️  Simplify code by merging `requestBuilder.ts` in to `createNodesera` function ([#10](https://github.com/Kasparas-G55/nodesera/pull/10))

### ❤️ Contributors

- Kasparas Galdikas ([@Kasparas-G55](http://github.com/Kasparas-G55))
- Kasparas-G55 <kasparas.galdikas55@gmail.com>

