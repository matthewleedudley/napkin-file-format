import { parseNapkin } from './parser';

describe('parseNapkin', () => {
  it('parses a simple single-line note', () => {
    const content = 'title,Test';
    expect(parseNapkin(content)).toEqual([[['title','Test']]]);
  });

  it('parses multiple notes separated by blank line', () => {
    const content = 'a,1\n\nb,2';
    expect(parseNapkin(content)).toEqual([[['a','1']],[['b','2']]]);
  });

  it('throws on leading blank line', () => {
    expect(() => parseNapkin('\nfoo,bar')).toThrow();
  });

  it('throws on trailing blank line', () => {
    expect(() => parseNapkin('foo,bar\n')).toThrow();
  });

  it('throws on multiple blank lines', () => {
    expect(() => parseNapkin('a,1\n\n\nb,2')).toThrow();
  });

  it('throws on indentation', () => {
    expect(() => parseNapkin(' a,1')).toThrow(/Indentation not allowed/);
  });

  it('throws on long line', () => {
    const longLine = 'x'.repeat(61);
    expect(() => parseNapkin(longLine)).toThrow(/Line too long/);
  });

  it('throws on line ending with a period', () => {
    expect(() => parseNapkin('foo,bar.')).toThrow(/Line ends with a period/);
  });
});
