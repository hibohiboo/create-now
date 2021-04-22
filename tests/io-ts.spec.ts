import * as t from "io-ts";
import { isRight, map, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

describe("JSON.parse()のみ", () => {
  test("stringをobjectと処理するとundefined", () => {
    const x = JSON.parse(`"a"`);
    expect(x.b).toBeUndefined();
  });
  test("存在しない属性はundefined", () => {
    const x = JSON.parse(`{"a":123}`);
    expect(x.b).toBeUndefined();
  });
  test("stringをnumberとして処理するとNaN", () => {
    const x: number = JSON.parse(`"a"`);
    expect(x * 2).toBeNaN();
  });
});

describe("io-tsを使う", () => {
  test("stringはnumberではない", () => {
    const x = t.number.decode(JSON.parse(`"a"`));
    expect(isRight(x)).toBeFalsy();
  });
  test("numberはstringではない", () => {
    const x = t.string.decode(JSON.parse(`123`));
    expect(isRight(x)).toBeFalsy();
  });

  test("オブジェクトの検査", () => {
    const X = t.type({ a: t.number });
    const x = X.decode(JSON.parse(`{"a":123}`));
    expect(x).toStrictEqual(right({ a: 123 }));
  });
  test("オブジェクトのプロパティが一致しない", () => {
    const X = t.type({ x: t.number });
    const x = X.decode(JSON.parse(`{"a":123}`));
    expect(isRight(x)).toBeFalsy();
  });
  test("余分なプロパティがあっても良い", () => {
    const X = t.type({ a: t.number });
    const x = X.decode(JSON.parse(`{"a":123,"b":456}`));
    expect(x).toStrictEqual(right({ a: 123, b: 456 }));
  });
  test("exactを使うと余分なプロパティは消える", () => {
    const X = t.exact(t.type({ a: t.number }));
    const x = X.decode(JSON.parse(`{"a":123,"b":456}`));
    expect(x).toStrictEqual(right({ a: 123 }));
  });
  test("unionの例", () => {
    const X = t.union([
      t.type({ x: t.literal("number"), a: t.number }),
      t.type({ x: t.literal("string"), a: t.string })
    ]);
    type XType = t.TypeOf<typeof X>; // 型情報が取れる
    const num = X.decode(JSON.parse(`{"x": "number", "a":123}`));
    const str = X.decode(JSON.parse(`{"x": "string", "a":"xyz"}`));

    const f = (a: XType) => {
      switch (a.x) {
        case "number":
          return a.a * 2;
        case "string":
          return a.a.length;
      }
    };
    expect(pipe(num, map(f))).toStrictEqual(right(246));
    expect(pipe(str, map(f))).toStrictEqual(right(3));
  });
});
