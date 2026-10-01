type TextBlock = { type: 'heading' | 'paragraph'; text: string }
type ListItem = { marker: string; text: string; children: ContentBlock[] }
type ListBlock = { type: 'list'; ordered: boolean; items: ListItem[] }
type ContentBlock = TextBlock | ListBlock

function getListItem(line: string) {
  const match = /^(\s*)(\*|\d+\.|[a-z]+\.)\s+(.+)$/.exec(line)
  return match ? { indent: match[1].length, marker: match[2], text: match[3] } : null
}

function parseList(lines: string[], start: number): { block: ListBlock; next: number } {
  const first = getListItem(lines[start])!
  const block: ListBlock = { type: 'list', ordered: first.marker !== '*', items: [] }
  let next = start

  while (next < lines.length) {
    const item = getListItem(lines[next])
    if (!item || item.indent < first.indent) break
    if (item.indent > first.indent) {
      const nested = parseList(lines, next)
      block.items[block.items.length - 1].children.push(nested.block)
      next = nested.next
    } else {
      if ((item.marker !== '*') !== block.ordered) break
      block.items.push({ marker: item.marker, text: item.text, children: [] })
      next++
    }
  }

  return { block, next }
}

function parseParagraph(paragraph: string): ContentBlock[] {
  const lines = paragraph.split('\n').filter((line) => line.trim())
  const blocks: ContentBlock[] = []
  let next = 0

  while (next < lines.length) {
    if (getListItem(lines[next])) {
      const list = parseList(lines, next)
      blocks.push(list.block)
      next = list.next
    } else {
      const text = lines[next].trim()
      blocks.push({ type: /^Article \d+\.\d+\b/.test(text) ? 'heading' : 'paragraph', text })
      next++
    }
  }

  return blocks
}

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'heading') {
      return <h4 className="pt-3 text-[17px] leading-[1.5] font-bold text-heading first:pt-0" key={index}>{block.text}</h4>
    }
    if (block.type === 'paragraph') return <p key={index}>{block.text}</p>
    if (block.type !== 'list') return null

    const List = block.ordered ? 'ol' : 'ul'
    return (
      <List className="space-y-3" key={index} role="list">
        {block.items.map((item, itemIndex) => (
          <li className="grid grid-cols-[2ch_minmax(0,1fr)] items-baseline gap-x-3 max-[480px]:gap-x-2" key={itemIndex}>
            <span className="text-right font-medium text-link">{block.ordered ? item.marker : '•'}</span>
            <div className="min-w-0">
              <p>{item.text}</p>
              {item.children.length > 0 && (
                <div className="mt-3 space-y-3">
                  <ContentBlocks blocks={item.children} />
                </div>
              )}
            </div>
          </li>
        ))}
      </List>
    )
  })
}

function ConstitutionContent({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-6 text-base leading-[1.8] text-heading [overflow-wrap:anywhere] max-[480px]:text-[15px]">
      {paragraphs.map((paragraph, index) => (
        <div className="space-y-4" key={index}>
          <ContentBlocks blocks={parseParagraph(paragraph)} />
        </div>
      ))}
    </div>
  )
}

export default ConstitutionContent
