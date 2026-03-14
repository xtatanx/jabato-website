import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

/**
 * Recursively extract plain text from serialized Lexical nodes
 */
// biome-ignore lint/suspicious/noExplicitAny: Lexical node structure is dynamic
function extractTextFromNodes(nodes: any[]): string {
  return (
    nodes
      // biome-ignore lint/suspicious/noExplicitAny: Lexical node structure is dynamic
      .map((node: any) => {
        if (node.type === 'text' && node.text) {
          return node.text;
        }
        if (node.children && Array.isArray(node.children)) {
          return extractTextFromNodes(node.children);
        }
        return '';
      })
      .join(' ')
  );
}

/**
 * Extract plain text from Lexical rich text content
 * Useful for generating excerpts, meta descriptions, or plain text versions
 */
export function extractTextFromLexical(
  data: DefaultTypedEditorState | null | undefined,
): string {
  if (!data || !data.root || !data.root.children) {
    return '';
  }

  return extractTextFromNodes(data.root.children).trim();
}


