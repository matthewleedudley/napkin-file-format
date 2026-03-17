# Napkin File Format

Napkin is a small plain-text note format idea.

It is not trying to be a full spec, schema language, or serious data
format. The point is just to define a lightweight shape for notes that
are still easy for people and tools to work with.

The basic idea is simple:

- A file is made of note blocks
- Each note is separated by one blank line
- Each line inside a note is split on commas

That is most of it.

## What A Napkin File Looks Like

```text
Sept 14 2025, 50 bucks, 50lbs of sugar,
Needed sugar

October 4 2025, $10, gloves,
Just stocking up on gloves
```

In that example:

- There are two notes
- Each note has one or more lines
- Each line becomes a row
- Each row can be read as comma-separated values

## Rules

- Use the `.napkin` file extension
- Use UTF-8 text
- Use LF line endings (`\n`)
- Do not start or end the file with a blank line
- Separate notes with exactly one blank line
- Do not indent lines with spaces or tabs
- Keep every line at 60 characters or less

## Suggested Interpretation

One reasonable way to read a napkin file:

- One blank line means "start a new note"
- Each non-blank line is one row in that note
- Each row is split on commas
- Extra spaces around comma-separated values are trimmed

## Why Use It

Napkin is useful if you want something a little more structured than
raw text without moving all the way to JSON, YAML, or a custom schema.

It works best when:

- You want quick handwritten or generated notes
- You want a format with very few rules
- You want predictable note boundaries for later processing

## Repo Layout

- [`examples/`](./examples) has sample `.napkin` files

## Feedback

Feedback and suggestions are welcome. See
[`CONTRIBUTING.md`](./CONTRIBUTING.md).
