# Changelog


## v0.2.0


### 🚀 Enhancements

- Request URL Builder ([#4](https://github.com/Kasparas-G55/nodesera/pull/4))
- Decoding callback data to `URLSearchParams` string or `RequestParams` ([bd079c5](https://github.com/Kasparas-G55/nodesera/commit/bd079c5))
- Verifying RSA-SHA1 key signature and MD5 hash signature ([3edecbd](https://github.com/Kasparas-G55/nodesera/commit/3edecbd))

### 🩹 Fixes

- **ci:** Fix build job ([9749034](https://github.com/Kasparas-G55/nodesera/commit/9749034))
- Change package.json version ([a12530f](https://github.com/Kasparas-G55/nodesera/commit/a12530f))

### 💅 Refactors

- Pass `invalidParams` to `verifyRequestParams` by reference and throw inside `encodeURLBase64` ([47e1bcb](https://github.com/Kasparas-G55/nodesera/commit/47e1bcb))
- Fix failing tests ([97d87b2](https://github.com/Kasparas-G55/nodesera/commit/97d87b2))

### 📖 Documentation

- Small `readme` changes ([#3](https://github.com/Kasparas-G55/nodesera/pull/3))

### 🏡 Chore

- Add `release-please` workflow ([#2](https://github.com/Kasparas-G55/nodesera/pull/2))
- Remove regexp check from `requestValidation` didn't really seem necessary in my opinion. ([5d383d2](https://github.com/Kasparas-G55/nodesera/commit/5d383d2))
- Rename `index.ts` to `nodesera.ts` ([583ccb7](https://github.com/Kasparas-G55/nodesera/commit/583ccb7))
- Update dev dependencies ([1459af6](https://github.com/Kasparas-G55/nodesera/commit/1459af6))
- Remove global env types ([13d04e0](https://github.com/Kasparas-G55/nodesera/commit/13d04e0))
- Reconfigure `unbuild` ([2a8f87a](https://github.com/Kasparas-G55/nodesera/commit/2a8f87a))
- Update README.md TODO: Write documentation ([bcd2bee](https://github.com/Kasparas-G55/nodesera/commit/bcd2bee))

### ✅ Tests

- Separate `validation` from `requestBuilder` test: exceeding request params max length ([bc2aa15](https://github.com/Kasparas-G55/nodesera/commit/bc2aa15))

### 🤖 CI

- Chore: update build workflow ([#5](https://github.com/Kasparas-G55/nodesera/pull/5))
- Remove node v16 build ([69c8c34](https://github.com/Kasparas-G55/nodesera/commit/69c8c34))
- Remove `release-please` github action ([8288e70](https://github.com/Kasparas-G55/nodesera/commit/8288e70))
- Rename job ([07f332a](https://github.com/Kasparas-G55/nodesera/commit/07f332a))

### ❤️ Contributors

- Kasparas-G55 <kasparas.galdikas55@gmail.com>
- Kasparas Galdikas ([@Kasparas-G55](http://github.com/Kasparas-G55))

