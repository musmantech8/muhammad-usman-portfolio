// A tiny PL/SQL tokenizer for the code-peek snippets. It returns
// [{ text, type }] pairs, so no syntax-highlighting library is needed.

const KEYWORDS = new Set([
  'CREATE', 'OR', 'REPLACE', 'PACKAGE', 'BODY', 'PROCEDURE', 'FUNCTION', 'TRIGGER',
  'IS', 'AS', 'BEGIN', 'END', 'IF', 'THEN', 'ELSE', 'ELSIF', 'RETURN', 'DECLARE',
  'SELECT', 'INTO', 'FROM', 'WHERE', 'UPDATE', 'SET', 'INSERT', 'VALUES', 'ON',
  'BEFORE', 'AFTER', 'FOR', 'EACH', 'ROW', 'AND', 'NOT', 'NULL', 'IN', 'OUT',
  'CASE', 'WHEN', 'BETWEEN', 'ROUND', 'COUNT', 'RAISE_APPLICATION_ERROR',
]);

// Order matters: comments, strings, numbers, words, whitespace, anything else.
const TOKEN_RE = /(--[^\n]*)|('(?:[^']|'')*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([\s\S])/g;

export function highlightPlsql(code) {
  const tokens = [];
  for (const match of code.matchAll(TOKEN_RE)) {
    const [text, comment, string, number, word, space] = match;
    let type = 'plain';
    if (comment) type = 'com';
    else if (string) type = 'str';
    else if (number) type = 'num';
    else if (word) type = KEYWORDS.has(word.toUpperCase()) ? 'kw' : 'id';
    else if (space) type = 'space';
    tokens.push({ text, type });
  }
  return tokens;
}
