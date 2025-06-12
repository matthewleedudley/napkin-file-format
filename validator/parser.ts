import fs from 'fs';

export type Note = string[][];

export function parseNapkin(content: string): Note[] {
  const lines = content.split('\n');
  if (lines[0].trim() === '' || lines[lines.length - 1].trim() === '') {
    throw new Error('File must not start or end with blank line');
  }
  const notes: Note[] = [];
  let current: string[][] = [];

  lines.forEach((line, idx) => {
    if (line === '') {
      if (current.length === 0) {
        throw new Error(`Unexpected multiple blank lines at line ${idx + 1}`);
      }
      notes.push(current);
      current = [];
    } else {
      // 1) No indentations
      if (/^[ \t]/.test(line)) {
        throw new Error(`Indentation not allowed at line ${idx + 1}`);
      }
      // 2) Max length
      if (line.length > 60) {
        throw new Error(`Line too long at line ${idx + 1}`);
      }
      // 3) No trailing periods
      if (/\.$/.test(line)) {
        throw new Error(`Line ends with a period at line ${idx + 1}`);
      }
      // 4) Parse comma-separated data points
      const parts = line.split(',').map(p => p.trim());
      current.push(parts);
    }
  });

  if (current.length > 0) {
    notes.push(current);
  }
  return notes;
}

// CLI usage
if (require.main === module) {
  const [,, file] = process.argv;
  if (!file) {
    console.error('Usage: parseNapkin <file>');
    process.exit(1);
  }
  try {
    const content = fs.readFileSync(file, 'utf-8');
    const notes = parseNapkin(content);
    console.log(JSON.stringify(notes, null, 2));
  } catch (err: any) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}
