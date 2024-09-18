import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import Link from 'next/link';

/**
 * 用于显示单个博客文章的卡片组件。
 * @param post - 博客文章的详细信息，包括标题、日期和摘要等。
 * @returns 返回一个包含文章标题、发布日期和摘要的卡片组件。
 */
function PostCard(post: Post) {
  return (
    <div className='mb-8'>
      <h2 className='mb-1 text-xl'>
        <Link href={post.url} className='text-blue-700 hover:text-blue-900'>
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <p>{post.summary}</p>
    </div>
  );
}

/**
 * 主页组件，用于显示博客文章列表。
 * 该组件首先根据文章发布日期对文章进行排序，然后逐个渲染文章卡片。
 */
export default function Home() {
  // 根据日期对文章进行降序排序
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className='max-w-xl mx-auto my-8'>
      <h1 className='text-center'>Next.js + Contentlayer blog</h1>
      {posts.map((post) => (
        <PostCard {...post} key={post._id} />
      ))}
    </div>
  );
}