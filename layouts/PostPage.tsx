import Image from 'next/image'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import type { PageProps } from '@lib/types'
import components from '@components/MDXComponents'
import Container from '@components/partials/Container'
import Avatar from '@assets/images/avatar.png'
import Meta from '@components/partials/Meta'
import { showDate } from '@lib/date'

type Props = {} & PageProps

const PostPageLayout = ({ code, frontmatter }: Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <Meta meta={{
        title: frontmatter.meta.title,
        description: frontmatter.meta.description,
        image: frontmatter.meta.image,
      }} />
      <section className="pt-8 pb-14 md:py-14">
        <Container className="max-w-3xl">
          <article>
            <h1 className="font-bold text-3xl md:text-4xl leading-tight mb-4">{frontmatter.title}</h1>
            <div className="flex justify-between">
              <div className="flex space-x-4 items-center text-gray-700 mb-6 md:mb-10">
                <div className="flex items-center space-x-2">
                  <Image width={24} height={24} src={Avatar} />
                  <span className="text-gray-800 font-medium">Javier Diaz</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-900" />
                <time
                  dateTime={showDate(frontmatter.published).iso}
                  className="inline-block">{showDate(frontmatter.published).formatted}</time>
              </div>
              <span className="inline-block">{Math.ceil(frontmatter.readingTime.time/1000/60)} min. de lectura</span>
            </div>
            <div className="relative lg:-mx-10 mb-6 md:mb-10">
              <Image
                className="w-full h-full rounded-lg"
                width={976}
                height={580}
                src={frontmatter.image} />
            </div>
            <p className="leading-loose italic mb-6 md:mb-10">
              <span className="pr-2 uppercase text-sm tracking-widest not-italic font-bold text-orange-600">Resumen »</span> {frontmatter.summary}
            </p>
            <div className="prose max-w-none">
              <Component components={{
                ...components
              }} />
            </div>
          </article>
        </Container>
      </section>
    </>
  )
}

export default PostPageLayout
