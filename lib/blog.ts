import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string
  readTime: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR)
  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace('.md', '')
      return getPost(slug)!
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    date: data.date ? String(data.date) : '',
    excerpt: data.excerpt ?? '',
    author: data.author ?? '',
    category: data.category ?? '',
    readTime: data.readTime ?? '',
    content,
  }
}

/** Very simple markdown-to-HTML converter for basic blog content. */
export function renderMarkdown(md: string): string {
  return md
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">${trimmed.slice(3)}</h2>`
      }
      if (trimmed.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-3">${trimmed.slice(4)}</h3>`
      }
      // Bullet list block
      if (trimmed.startsWith('- ')) {
        const items = trimmed
          .split('\n')
          .filter((l) => l.startsWith('- '))
          .map((l) => `<li class="text-gray-700 mb-2">${inlineFormat(l.slice(2))}</li>`)
          .join('')
        return `<ul class="list-disc list-inside space-y-1 my-4">${items}</ul>`
      }
      return `<p class="text-gray-700 leading-relaxed mb-4">${inlineFormat(trimmed)}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}
