# Napkin File Format

A napkin file is a bare bones plain-text format built for AI ingestion: each file is simply a series of free-form note blocks separated by a single blank line, with no blank first or last line and no indentation or key/value rules. These minimal constraints give large-language-model parsers a predictable wrapper around unstructured text, making it easier to extract and convert the contents into structured data.

## File Basics

- **Extension**: `.napkin`
- **Encoding**: UTF-8
- **Line endings**: LF (`\n`)

## Document-Level Rules

1. **No leading/trailing blank lines**
   - The very first and very last lines must contain at least one non whitespace character.
2. **Notes**
   - The file is a sequence of one or more _notes_.
   - Each note is a contiguous block of one or more non-blank lines.
   - Notes are _always_ separated by exactly one blank line.
3. **No indentations**
4. **No trailing periods**
   - No non-blank line may end with a period (`.`).
   - Every non-blank line must start in column 1.
   - Tabs or spaces at the start of a line are disallowed.
5. **Max 60 character lines**
   - Every line (including blank lines) must be no more than 60 characters long.

## Note Syntax

- Within a note, each **data point** is text, and points are **comma-separated**.
- A note may be:
  - A **single line** with one or more comma-separated data points, or
  - **Multiple lines**, each up to 60 characters, where each line is one “row”.

## Example

```
Sept 14 2025, 50 bucks, 50lbs of sugar,
Needed sugar

October 4 2025, $10, gloves,
Just stocking up on gloves
```

## Formal Grammar (EBNF)

```
<file>       ::= <note> ( BLANK_LINE <note> )*
<note>       ::= <data_line> ( NEWLINE <data_line> )*
<data_line>  ::= <data_point> ( "," <data_point> )*
<data_point> ::= <non_comma_text>
<non_comma_text> ::= any printable character except comma or newline
BLANK_LINE    ::= NEWLINE
NEWLINE       ::= "\n"
```

_With constraints:_
- `<file>` starts and ends with `<data_line>`.
- No leading spaces or tabs on any `<data_line>`.
- Every line ≤ 60 characters.

## Validation Checklist

- **First/Last-line**: fail if blank.
- **Note separation**: fail if not exactly one blank line between notes.
- **Indentation**: fail if any line begins with space or tab.
- **Line-length**: fail if > 60 chars.
- **Comma parse**: split each line on commas.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
