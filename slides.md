---
theme: default
title: JSDoc + TypeScript
lineNumbers: true
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# JSDoc + TypeScript

Adicionando tipagem e documentação, sem adicionar uma etapa de compilação.

---
layout: center
---

# JSDoc

- É uma forma de adicionar documentação ao seu código JavaScript.
- Utiliza comentários de bloco para adicionar metadados ao seu código.
- Possui um sistema de tipagem próprio.
- É interpretado pelo `tsserver`, que é capaz de inferir tipos a partir dele.
  - O `tsserver` é o servidor de linguagem do TypeScript, que provê funcionalidades avançadas de edição de código para JavaScript e TypeScript.
- Define uma série de tags que podem ser utilizadas para adicionar metadados ao código.

---

# JSDoc - Exemplo

<<< ./sum.js {monaco-write}{height:'50vh'}

---
layout: center
---

# Tags

São precedidas por um `@` e são utilizadas para adicionar metadados ao código. Podem ter parâmetros adicionais, e podem ser utilizadas em qualquer ordem.

---
layout: section
---

# Principais tags

---

# `@param`

<v-switch>
  <template #0>
<<< ./at_param.js {monaco-write}  
  </template>
  <template #1>
<<< ./at_param_ts_types.js {monaco-write}
  </template>
</v-switch>

---

# `@template`

````md magic-move
```js
/**
 * Locks the entity, executes the operation and releases the lock
 *
 * @param {() => Promise} operation - The operation to perform while the entity is locked.
 * @returns {Promise} The result of the operation performed while the entity is locked.
 * @throws {LemonError} Throws a `LemonError` if the entity is not found or is already locked.
 */
async function withLock(operation) => {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}
```
```js
/**
 * Locks the entity, executes the operation and releases the lock
 * 
 * @template T
 * 
 * @param {() => Promise} operation - The operation to perform while the entity is locked.
 * @returns {Promise} The result of the operation performed while the entity is locked.
 * @throws {LemonError} Throws a `LemonError` if the entity is not found or is already locked.
 */
async function withLock(operation) => {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}
```
```js
/**
 * Locks the entity, executes the operation and releases the lock
 * 
 * @template T
 * 
 * @param {() => Promise<T>} operation - The operation to perform while the entity is locked.
 * @returns {Promise} The result of the operation performed while the entity is locked.
 * @throws {LemonError} Throws a `LemonError` if the entity is not found or is already locked.
 */
async function withLock(operation) => {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}
```
```js
/**
 * Locks the entity, executes the operation and releases the lock
 * 
 * @template T
 * 
 * @param {() => Promise<T>} operation - The operation to perform while the entity is locked.
 * @returns {Promise<T>} The result of the operation performed while the entity is locked.
 * @throws {LemonError} Throws a `LemonError` if the entity is not found or is already locked.
 */
async function withLock(operation) => {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}
```
```js
/**
 * Locks the entity, executes the operation and releases the lock
 * 
 * @template T
 * 
 * @param {() => Promise<T>} operation - The operation to perform while the entity is locked.
 * @returns {Promise<T>} The result of the operation performed while the entity is locked.
 * @throws {LemonError} Throws a `LemonError` if the entity is not found or is already locked.
 */
async function withLock(operation) => {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}

const result = await withLock(async () => {
//    ^? Promise<Person>
  return await doSomething() // doSomething() returns a Promise<Person>
})
```
````

---

# `@example`

```js
/**
 * Locks the entity, executes the operation and releases the lock
 * 
 * @template T
 * 
 * @param {() => Promise<T>} operation - The operation to perform while the entity is locked.
 * @returns {Promise<T>} The result of the operation performed while the entity is locked.
 * @throws {LemonError} Throws a `LemonError` if the entity is not found or is already locked.
 * 
 * @example
 * ```javascript
 * const result = await withLock(async () => {
 *  // Perform operation
 * })
 * ```
 */
async function withLock(operation) {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}
```

---

# `@type`

<<< ./at_type.js {monaco-write}

---

# `@import`

````md magic-move
```ts
// createUser.ts

/**
 * @param user {{
 *  name: string,
 *  age: number
 *  email: string
 *  phone: string
 *  address: {
 *     street: string,
 *     city: string,
 *     state: string,
 *   }
 * }} Information about the user
 */
function createUser(user) {
 // ...
}
```
```ts
// user.d.ts

export interface User {
  /** The user's name. Must be between 3 and 30 chars */
  name: string
  /** The user's age. Must be between 18 and 120 */
  age: number
  /** The user's email. Must be a valid email */
  email: string
  /** The user's phone number. Must be a valid phone number from Brazil */
  phone: string
  /** The user's address */
  address: {
    /** The street where the user lives */
    street: string
    /** The city where the user lives */
    city: string
    /** The state where the user lives */
    state: string
  }
}
```
```ts
// createUser.ts

/**
 * @param user {{
 *  name: string,
 *  age: number
 *  email: string
 *  phone: string
 *  address: {
 *     street: string,
 *     city: string,
 *     state: string,
 *   }
 * }} Information about the user
 */
function createUser(user) {
 // ...
}
```
```ts
// createUser.ts

/** @import { User } from "./user" */

/**
 * @param user {{
 *  name: string,
 *  age: number
 *  email: string
 *  phone: string
 *  address: {
 *     street: string,
 *     city: string,
 *     state: string,
 *   }
 * }} Information about the user
 */
function createUser(user) {
 // ...
}
```
```ts
// createUser.ts

/** @import { User } from "./user" */

/**
 * 
 * @param user {User} Information about the user
 */
function createUser(user) {
 // ...
}
```
````

---
layout: statement
---

# API Reference

Podemos gerar uma documentação da nossa API a partir dos comentários JSDoc através de ferramentas como o `typedoc`.

---
layout: iframe

url: https://microsoft.github.io/monaco-editor/docs.html
---
