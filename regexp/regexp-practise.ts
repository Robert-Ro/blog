/**
 * 格式化输入
 * @param str
 * @returns
 */
export const convert = (str: string): string => {
  return str
    .replace(/(?<=\d{3})\d+/, ($0) => `,${$0}`)
    .replace(/(?<=[,\d]{8})\d+/, ($0) => `,${$0}`); // NOTE 特例情况
};
/**
 * 提取中间关键字符, 使用的分组引用
 * @param input
 * @returns
 */
export const trim = (input: string): string => {
  return input.replace(/^\s*(.*?)\s*$/, "$1");
};
/**
 * 去掉开头和结尾的空字符
 * @param input
 * @returns
 */
export const trim2 = (input: string): string => {
  return input.replace(/^\s*|\s*$/g, "");
};
/**
 * 首字母大写
 * 非捕获性括号
 * @param input
 * @returns
 */
export const wordUppercase = (input: string): string => {
  return input.toLowerCase().replace(/(?:^|\s)\w/g, (c) => c.toUpperCase());
};
/**
 * 横向转驼峰
 * 非捕获性括号
 * @param input
 * @returns
 */
export const word2CamelCase = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/(?:^|-)(\w)/g, (_, $1) => $1.toUpperCase());
};
/**
 * 驼峰化
 * @param input
 * @returns
 */
export const camelCase = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[\s-_]+(\w)/g, (_, $1) => $1.toUpperCase());
};
/**
 * 中划线化
 * @param input
 * @returns
 */
export const dasherize = (input: string): string => {
  return input.replace(/[A-Z]/g, ($0) => `-${$0.toLowerCase()}`);
};
const ESCAPECHARS = {
  "<": "lt",
  ">": "gt",
  '"': "quot",
  "'": "apos",
  "&": "amp",
};
type EscapeChars = keyof typeof ESCAPECHARS;
const HTMLENTITIES = {
  nbsp: " ",
  lt: "<",
  gt: ">",
  quot: '"',
  amp: "&",
  apos: "'",
};
type Htmlentities = keyof typeof HTMLENTITIES;
/**
 * html转义
 * @param input
 * @returns
 */
export const escapeHTML = (input: string): string => {
  const reg = new RegExp(`[${Object.keys(ESCAPECHARS).join("")}]`, "g");
  // @ts-ignore
  return input.replace(reg, (c: EscapeChars) => `&${ESCAPECHARS[c]};`);
};
/**
 * 反转义
 * @param input
 * @returns
 */
export const unescapseHTML = (input: string): string => {
  const reg = new RegExp(`&([^;]+);`, "g");
  // @ts-ignore
  return input.replace(reg, (_, c: Htmlentities) => `${HTMLENTITIES[c] || ""}`);
};
/**
 * 匹配成对的标签
 * @param input
 */
export const matchPair = (input: string): boolean => {
  // NOTE 反向引用
  return /<([^>]+)>.*?<\/\1>/g.test(input);
};
