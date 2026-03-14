import { cn } from '@/lib/utils';
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedHeadingNode,
  DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical';
import {
  type JSXConvertersFunction,
  type JSXConverter,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react';
import { TypographyJSXConverters } from 'payload-lexical-typography/converters';

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc;
  if (!doc) {
    throw new Error('Expected doc to be defined');
  }
  const { value, relationTo } = doc;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'posts' ? `/blog/${slug}` : `/${slug}`;
};

/**
 * Recursively extract plain text from serialized Lexical nodes
 */
// biome-ignore lint/suspicious/noExplicitAny: Lexical node structure is dynamic
function extractTextFromNodes(nodes: any[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text' && node.text) {
        return node.text;
      }
      if (node.children && Array.isArray(node.children)) {
        return extractTextFromNodes(node.children);
      }
      return '';
    })
    .join('');
}

/**
 * Generate a slug from text content for anchor links
 */
function generateSlug(text: string): string {
  if (!text || text.trim() === '') {
    return 'heading';
  }
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Heading styles map based on codebase analysis
 */
const headingStyles: Record<string, string> = {
  h1: 'text-4xl font-extrabold uppercase text-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase',
  h3: 'text-lg sm:text-xl lg:text-2xl font-extrabold',
  h4: 'text-base sm:text-lg lg:text-xl font-extrabold',
  h5: 'text-sm sm:text-base lg:text-lg font-semibold',
  h6: 'text-xs sm:text-sm lg:text-base font-semibold',
};

/**
 * Heading converter function following LinkJSXConverter pattern
 */
function headingConverter() {
  return {
    heading: (({
      node,
      nodesToJSX,
    }: {
      node: SerializedHeadingNode;
      nodesToJSX: (args: { nodes: typeof node.children }) => React.ReactNode[];
    }) => {
      const tag = node.tag || 'h1';
      const plainText = extractTextFromNodes(node.children);
      const slug = generateSlug(plainText);
      const children = nodesToJSX({ nodes: node.children });
      const className = headingStyles[tag] || headingStyles.h1;

      const Tag = tag;
      return (
        <Tag id={slug} className={className}>
          {children}
        </Tag>
      );
    }) as JSXConverter<SerializedHeadingNode>,
  };
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...TypographyJSXConverters,
  ...headingConverter(),
  ...LinkJSXConverter({ internalDocToHref }),
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function LexicalRenderer(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className
      )}
      {...rest}
    />
  );
}

export default LexicalRenderer;
export { LexicalRenderer };
