# Changelog

### 2.1.0

#### Features:

- New SeoService method added: `updateStructuredData(jsonData)`.
  - Ability to create/update `ld+json` structured data / rich snippets.

### 2.0.0

#### Breaking Changes:

- `createWindowMocks` removed outside of ng-universal package entirely. Now found in `@trilon/universal-ssr-mocks`
- `createWindowMocks` RENAMED to `createGlobalMocks`
