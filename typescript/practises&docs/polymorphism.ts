// ts实现函数多态overloads
// Prefer parameters with union types instead of overloads when possible.优先联合类型而不是重载

{
  /**
   * 重载签名
   * @param input
   */
  function testPoly(input: string): void
  /**
   * 重载签名
   * @param input
   */
  function testPoly(input: number): void
  /**
   * 实际的函数体
   *
   * 实际的函数体（最后一个函数签名）是唯一一个具有实际实现的版本，重载签名只是用于类型检查和类型提示。
   * 在使用函数重载时，你需要确保所有的重载签名能够被最终实现的函数体所兼容。
   * @param input
   */
  function testPoly(input: number | string): void {
    switch (typeof input) {
      case 'string':
        break
      case 'number':
        break

      default:
        break
    }
  }
}

// Function declarations (overloads)
function foo(a: number, b: number): number
function foo(a: number, b: number, c: number): number

// Function implementation
function foo(a: number, b: number, c?: number): number {
  if (c) return a + b + c
  return a + b
}
// ts实现函数多态
/**
 * 重载签名
 * @param input
 */
export function testPoly(input: string): void
/**
 * 重载签名
 * @param input
 */
export function testPoly(input: number): void
/**
 * 实际的函数体
 *
 * 实际的函数体（最后一个函数签名）是唯一一个具有实际实现的版本，重载签名只是用于类型检查和类型提示。
 * 在使用函数重载时，你需要确保所有的重载签名能够被最终实现的函数体所兼容。
 * @param input
 */
export function testPoly(input: number | string): void {
  switch (typeof input) {
    case 'string':
      break
    case 'number':
      break
  }
{
  /**
   * 重载签名
   * @param input
   */
  function testPoly(input: string): void
  /**
   * 重载签名
   * @param input
   */
  function testPoly(input: number): void
  /**
   * 实际的函数体
   *
   * 实际的函数体（最后一个函数签名）是唯一一个具有实际实现的版本，重载签名只是用于类型检查和类型提示。
   * 在使用函数重载时，你需要确保所有的重载签名能够被最终实现的函数体所兼容。
   * @param input
   */
  function testPoly(input: number | string): void {
    switch (typeof input) {
      case 'string':
        break
      case 'number':
        break

      default:
        break
    }
  }
}
{
  // Function declarations (overloads)
  function foo(a: number, b: number): number
  function foo(a: number, b: number, c: number): number

  // Function implementation
  function foo(a: number, b: number, c?: number): number {
    if (c) return a + b + c
    return a + b
  }
}
