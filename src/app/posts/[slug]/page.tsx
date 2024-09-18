import Mdx from '@/components/mdx-components';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { getMDXComponent } from 'next-contentlayer2/hooks';

// 定义帖子页面的属性接口
interface PostPageProps {
  params: {
    slug: string; // 帖子的唯一标识符
  };
}

// 帖子页面组件
export default function PostPage({ params }: PostPageProps) {
  // 根据路径标识符查找对应的帖子
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  // 如果找不到帖子或者帖子内容为空，则显示提示信息
  if (!post?.body.code) {
    return <div>No post here!</div>;
  }

  // 返回帖子页面布局
  return (
    <article className='py-8 mx-auto max-w-xl'>
      <div className='mb-8 text-center'>
        {/* 显示帖子的发布时间 */}
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        {/* 显示帖子标题 */}
        <h1>{post.title}</h1>
      </div>
      {/* 渲染帖子正文 */}
      <Mdx code={post.body.code} />
    </article>
  );
}