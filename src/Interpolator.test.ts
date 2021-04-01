import Interpolator from "./Interpolator"

test('escapeRegex() returns string correctly', () => {
    expect(Interpolator.escapeRegex("PUBLIC_URL")).toBe("PUBLIC_URL");
});

test('escapeRegex() throws TypeError on non-string param', () => {
    // @ts-ignore-next-line
    expect(() => Interpolator.escapeRegex(0)).toThrow(TypeError)
});