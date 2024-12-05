export function ShortProductDescription({ product }: { product: any }) {
  const shortDescriptionMetafield = product.metafields.find(
    (metafield: any) => metafield?.key === 'short_description_product'
  );

  if (!shortDescriptionMetafield) return null;

  const parsedValue = JSON.parse(shortDescriptionMetafield.value);

  const renderRichTextContent = (content: any, index: number = 0) => {
    if (!content || !content.type) return null;

    switch (content.type) {
      case 'root':
        return content.children.map((child: any, idx: number) => renderRichTextContent(child, idx));

      case 'list':
        const ListTag = content.listType === 'unordered' ? 'ul' : 'ol';

        return (
          <ListTag className="list-disc space-y-2 pb-4 pl-6" key={index}>
            {content.children.map((child: any, idx: number) => renderRichTextContent(child, idx))}
          </ListTag>
        );

      case 'list-item':
        return (
          <li key={index}>
            {content.children.map((child: any, idx: number) => renderRichTextContent(child, idx))}
          </li>
        );

      case 'text':
        return <span key={index}>{content.value}</span>;

      default:
        return null;
    }
  };

  return <div>{renderRichTextContent(parsedValue)}</div>;
}
