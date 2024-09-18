import { getMDXComponent, useMDXComponent } from 'next-contentlayer2/hooks';

// 定义自定义组件，用于在MDX内容中替换默认的HTML元素
const components = {
  // 自定义<h1>样式
  h1: ({ ...props }) => (
    <h1
      className={'mt-2 text-4xl font-bold tracking-tight text-red-300'}
      {...props}
    />
  ),
  // 自定义<h2>样式
  h2: ({ ...props }) => (
    <h2
      className={'mt-10 pb-1 text-3xl font-semibold tracking-tight'}
      {...props}
    />
  ),
  // 自定义<p>样式
  p: ({ ...props }) => <p className='mt-8 text-base leading-7' {...props} />,
};

// 定义Mdx组件的接口，包含MDX代码
interface MdxProps {
  code: string;
}
// 导出默认的Mdx组件
export default function Mdx({ code }: MdxProps) {
  // 使用useMDXComponent钩子根据code参数编译MDX内容
  const Component = useMDXComponent(code);
  // 渲染编译后的MDX内容，传入自定义的components
  return (
    <div>
      <Component components={components} />
    </div>
  );
}