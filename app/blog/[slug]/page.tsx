import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost, renderMarkdown } from '@/lib/blog'
import { SITE_URL } from '@/constants/site'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | TrackrAI Blog`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const htmlContent = renderMarkdown(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'TrackrAI',
      url: 'https://trackrai.io',
    },
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-white via-blue-50/30 to-white border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center text-xs text-brand-primary font-semibold bg-brand-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </article>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Start tracking your expenses today
          </h2>
          <p className="text-gray-600 mb-6">
            Import your bank CSV and TrackrAI categorises your transactions in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://app.trackrai.io/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Get Started Free
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
