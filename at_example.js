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
 * ```lua
 * local a = "b"
 * ```
 */
async function withLock(operation) {
  await lockEntity()
  return await operation().finally(async () => {
    await unlockEntity()
  })
}
