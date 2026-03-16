import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/constants/site'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Personal finance tips, guides, and updates from the TrackrAI team. Learn how to track your spending, manage subscriptions, and take control of your money.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog | TrackrAI',
    description:
      'Personal finance tips, guides, and updates from the TrackrAI team.',
    url: `${SITE_URL}/blog`,
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white via-blue-50/30 to-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-[#635BFF]/10 text-[#635BFF] rounded-full text-sm font-semibold mb-6">
            BLOG
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Personal finance, clearly explained
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Practical guides on tracking expenses, managing subscriptions, and making sense of your spending.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg hover:border-[#635BFF]/30 transition-all duration-300"
                >
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#635BFF] font-semibold bg-[#635BFF]/10 px-3 py-1 rounded-full">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#635BFF] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#635BFF] font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
