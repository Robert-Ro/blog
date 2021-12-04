import {
  camelCase,
  convert,
  dasherize,
  escapeHTML,
  matchPair,
  trim,
  trim2,
  unescapseHTML,
  word2CamelCase,
  wordUppercase,
} from "./regexp-practise";

describe("regexp正则测试集", () => {
  /**
   * 基于位置
   */
  it("数字的千分位分割法", () => {
    const regexp = /(?!^)(?=(\d{3})+$)/g;
    expect("123456789".replace(regexp, ",")).toBe("123,456,789");
    expect("123".replace(regexp, ",")).toBe("123");
    expect("1234".replace(regexp, ",")).toBe("1,234");
    expect("12345".replace(regexp, ",")).toBe("12,345");
    expect("123456".replace(regexp, ",")).toBe("123,456");
    expect("1234567".replace(regexp, ",")).toBe("1,234,567");
  });
  describe("数字按一定的规则分割", () => {
    const phone = "18379836654";
    it("手机号18379836654被正确处理为183-7983-6654", () => {
      const regexp = /(?=(\d{4})+$)/g; // NOTE 接下来是4个数字的位置
      expect(phone.replace(regexp, "-")).toBe("183-7983-6654");
    });
    it("手机号18379836654被正确处理为1837-9836-654", () => {
      const regexp = /(?<=^(\d{4})+)/g; // NOTE 4个数字后面的位置
      expect(phone.replace(regexp, "-")).toBe("1837-9836-654");
    });
  });
  describe("数字按一定的规则分割拓展", () => {
    it("数字123被正确处理为123", () => {
      expect(convert("123")).toEqual("123");
    });
    it("数字1234被正确处理为123,4", () => {
      expect(convert("1234")).toEqual("123,4");
    });
    it("数字12345被正确处理为123,45", () => {
      expect(convert("12345")).toEqual("123,45");
    });
    it("数字123456被正确处理为123,456", () => {
      expect(convert("123456")).toEqual("123,456");
    });
    it("数字1234567被正确处理为123,4567", () => {
      expect(convert("1234567")).toEqual("123,4567");
    });
    it("数字12345678被正确处理为123,4567,8", () => {
      expect(convert("12345678")).toEqual("123,4567,8");
    });
    it("数字123456789被正确处理为123,4567,89", () => {
      expect(convert("123456789")).toEqual("123,4567,89");
    });
    it("数字12345678911被正确处理为123,4567,8911", () => {
      expect(convert("12345678911")).toEqual("123,4567,8911");
    });
  });
  describe("格式化输入", () => {
    // vue-format-input实现
  });
  describe("密码强度", () => {
    //NOTE 密码长度是6-12位，由数字、小写字符和大写字母组成，但必须至少包括2种字符
    const regexp =
      /(((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z]))^[a-zA-Z\d]{6,12}/;
    it("含数字字母6-12内的字符串可以通过", () => {
      expect(regexp.test("232af4")).toBe(true);
      expect(regexp.test("123abc")).toBe(true);
      expect(regexp.test("abc123")).toBe(true);
      expect(regexp.test("2342aaf4")).toBe(true);
      expect(regexp.test("aafa123423qw")).toBe(true);
      expect(regexp.test("1a2s3d4f5g6h")).toBe(true);
    });
    it("纯数字的字符串不能通过", () => {
      expect(regexp.test("2342234234")).toBe(false);
      expect(regexp.test("23")).toBe(false);
      expect(regexp.test("2")).toBe(false);
      expect(regexp.test("234223423412")).toBe(false);
      expect(regexp.test("234223423423423412")).toBe(false);
    });
    it("纯字母的字符串不能通过", () => {
      expect(regexp.test("ad")).toBe(false);
      expect(regexp.test("a")).toBe(false);
      expect(regexp.test("fsadfsa")).toBe(false);
      expect(regexp.test("sadfsafagasdfgsadf")).toBe(false);
      expect(regexp.test("sagfagawerawrawr")).toBe(false);
    });
  });
  describe("非空校验", () => {
    // 前后非空，中间可为空的1-n个字符
    it("case 1", () => {
      // const reg = /(?=[^\s])^[a-zA-Z\d\s]{1,4}[^\s]{0,1}$/;
      const reg = /(?=[^\s])^[a-zA-Z\d\s]{0,4}[^\s]{1}$/;
      expect(reg.test("23423")).toBe(true);
      expect(reg.test(" 23422")).toBe(false);
      expect(reg.test("2342")).toBe(true);
      expect(reg.test("23 23")).toBe(true);
      expect(reg.test("2 23")).toBe(true);
      expect(reg.test("2 23 ")).toBe(false);
      expect(reg.test("2  ")).toBe(false);
      expect(reg.test("2   ")).toBe(false);
      expect(reg.test("2    ")).toBe(false);
      expect(reg.test(" 2")).toBe(false);
      expect(reg.test("  2")).toBe(false);
      expect(reg.test("   2")).toBe(false);
      expect(reg.test("    2")).toBe(false);
      expect(reg.test("     ")).toBe(false);
      expect(reg.test("2")).toBe(true);
      expect(reg.test("2a")).toBe(true);
    });
  });
  it("匹配id", () => {
    const string = '<div id="container" class="main"></div>';
    const match: RegExpMatchArray | null = string.match(/id=".*?"/);
    expect(match![0]).toBe(`id="container"`);
  });
  it("匹配颜色", () => {
    const reg = /#[a-fA-F\d]{3}|[a-fA-F\d]{6}/;
    expect(reg.test("#ffbbad")).toBe(true);
    expect(reg.test("#Fc01DF")).toBe(true);
    expect(reg.test("#FFF")).toBe(true);
    expect(reg.test("#ffE")).toBe(true);
  });
  it("匹配24小时制时间", () => {
    const reg1 = /^[0-2]\d:[0-5]\d$/;
    const reg2 = /^[01]\d|2[0-3]:[0-5]\d$/;
    expect(reg1.test("23:59")).toBe(true);
    expect(reg1.test("02:07")).toBe(true);
    expect(reg2.test("23:59")).toBe(true);
    expect(reg2.test("02:07")).toBe(true);
  });
  it("匹配24小时制时间 衍生题", () => {
    // 可以是非0;
    const reg = /^0?\d|1\d|2\d:0?\d|[1-5]\d$/;
    expect(reg.test("23:59")).toBe(true);
    expect(reg.test("02:07")).toBe(true);
    expect(reg.test("7:09")).toBe(true);
    expect(reg.test("17:9")).toBe(true);
  });
  it("匹配日期", () => {
    const reg = /^\d{4}-(0?[1-9]|1[12])-(0?[1-9]|[12]\d||3[01])$/;
    expect(reg.test("2021-11-26")).toBe(true);
    expect(reg.test("2021-1-6")).toBe(true);
    expect(reg.test("2021-11-6")).toBe(true);
    expect(reg.test("2021-11-16")).toBe(true);
    expect(reg.test("2021-1-16")).toBe(true);
    expect(reg.test("2021-1-30")).toBe(true);
    expect(reg.test("2021-2-28")).toBe(true);
  });
  describe("trim method", () => {
    it("case 1: 无空格", () => {
      expect(trim("a")).toEqual("a");
      expect(trim("aaa")).toEqual("aaa");
      expect(trim("a#a")).toEqual("a#a");
      expect(trim(".>,<a#a")).toEqual(".>,<a#a");

      expect(trim2("a")).toEqual("a");
      expect(trim2("aaa")).toEqual("aaa");
      expect(trim2("a#a")).toEqual("a#a");
      expect(trim2(".>,<a#a")).toEqual(".>,<a#a");
    });
    it("case 2: 尾空格", () => {
      expect(trim("a ")).toEqual("a");
      expect(trim("aaa ")).toEqual("aaa");
      expect(trim("a#a ")).toEqual("a#a");
      expect(trim(".>,<a#a ")).toEqual(".>,<a#a");

      expect(trim2("a ")).toEqual("a");
      expect(trim2("aaa ")).toEqual("aaa");
      expect(trim2("a#a ")).toEqual("a#a");
      expect(trim2(".>,<a#a ")).toEqual(".>,<a#a");
    });
    it("case 3: 前空格", () => {
      expect(trim(" a")).toEqual("a");
      expect(trim(" aaa")).toEqual("aaa");
      expect(trim(" a#a")).toEqual("a#a");
      expect(trim(" .>,<a#a")).toEqual(".>,<a#a");

      expect(trim2(" a")).toEqual("a");
      expect(trim2(" aaa")).toEqual("aaa");
      expect(trim2(" a#a")).toEqual("a#a");
      expect(trim2(" .>,<a#a")).toEqual(".>,<a#a");
    });
    it("case 4： 前后空格", () => {
      expect(trim(" a ")).toEqual("a");
      expect(trim(" aaa ")).toEqual("aaa");
      expect(trim("    a#a   ")).toEqual("a#a");
      expect(trim("     .>,<a#a    ")).toEqual(".>,<a#a");

      expect(trim2(" a ")).toEqual("a");
      expect(trim2(" aaa ")).toEqual("aaa");
      expect(trim2("    a#a   ")).toEqual("a#a");
      expect(trim2("     .>,<a#a    ")).toEqual(".>,<a#a");
    });
  });
  describe("首字母大写", () => {
    it("case 1", () => {
      expect(wordUppercase("a")).toEqual("A");
      expect(wordUppercase("ab")).toEqual("Ab");
      expect(wordUppercase("abc")).toEqual("Abc");
      expect(wordUppercase(" abc")).toEqual(" Abc");
      expect(wordUppercase("abc ")).toEqual("Abc ");
      expect(wordUppercase(" abc ")).toEqual(" Abc ");
    });
    it("case 2", () => {
      expect(wordUppercase("a v")).toEqual("A V");
      expect(wordUppercase("ab v")).toEqual("Ab V");
      expect(wordUppercase("abc v")).toEqual("Abc V");
      expect(wordUppercase(" abc v")).toEqual(" Abc V");
      expect(wordUppercase("abc v ")).toEqual("Abc V ");
      expect(wordUppercase(" abc v ")).toEqual(" Abc V ");
    });
  });
  describe("横向转驼峰", () => {
    it("case 1", () => {
      expect(word2CamelCase("base-act-tab")).toEqual("BaseActTab");
      expect(word2CamelCase("base-tab")).toEqual("BaseTab");
      expect(word2CamelCase("base")).toEqual("Base");
    });
  });
  describe("驼峰化", () => {
    it("case 1", () => {
      expect(camelCase("-moz-transform")).toEqual("MozTransform");
      expect(camelCase("_moz-transform")).toEqual("MozTransform");
      expect(camelCase(" moz-transform")).toEqual("MozTransform");
      expect(camelCase(" moz transform")).toEqual("MozTransform");
      expect(camelCase(" moz_transform")).toEqual("MozTransform");
    });
  });
  describe("中划线化", () => {
    it("case 1", () => {
      expect(dasherize("MozTransform")).toEqual("-moz-transform");
    });
  });
  describe("html转义", () => {
    it("case 1", () => {
      expect(escapeHTML("<div>Blah blah blah</div>")).toEqual(
        "&lt;div&gt;Blah blah blah&lt;/div&gt;"
      );
    });
    it("case 2", () => {
      expect(
        escapeHTML("<div id='a' class=\"c\">&Blah blah blah</div>")
      ).toEqual(
        "&lt;div id=&apos;a&apos; class=&quot;c&quot;&gt;&amp;Blah blah blah&lt;/div&gt;"
      );
    });
  });
  describe("html反转义", () => {
    it("case 1", () => {
      expect(unescapseHTML("&lt;div&gt;Blah blah blah&lt;/div&gt;")).toEqual(
        "<div>Blah blah blah</div>"
      );
    });
    it("case 2", () => {
      expect(
        unescapseHTML(
          "&lt;div id=&apos;a&apos; class=&quot;c&quot;&gt;&amp;Blah blah blah&lt;/div&gt;"
        )
      ).toEqual("<div id='a' class=\"c\">&Blah blah blah</div>");
    });
    it("case 3", () => {
      expect(
        unescapseHTML(
          "&lt;div&nbsp;id=&apos;a&apos;&nbsp;class=&quot;c&quot;&gt;&amp;Blah blah blah&lt;/div&gt;"
        )
      ).toEqual("<div id='a' class=\"c\">&Blah blah blah</div>");
    });
  });
  describe("匹配成对的标签", () => {
    it("case 1", () => {
      expect(matchPair("<title>regular expression</title>")).toEqual(true);
      expect(matchPair("<p>laoyao bye bye</p>")).toEqual(true);
    });
    it("case 2", () => {
      expect(matchPair("<title>wrong!</p>")).toEqual(false);
    });
  });
});
