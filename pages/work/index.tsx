import Image from 'next/image'
import { ArrowRight } from 'react-feather'
import type { InferGetStaticPropsType } from 'next'

import Container from '@components/partials/Container'
import { getProjects } from '@lib/mdx/projects'
import BaseLayout from '@layouts/BaseLayout'
import CustomLink from '@components/CustomLink'
import PostWithImage from '@components/PostWithImage'

export default function WorkIndexPage({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [firstProject, ...restProjects] = projects

  return (
    <>
      <section className="pt-8 md:pt-20">
        <Container className="max-w-screen-lg border-b border-gray-200">
          <h1 className="font-extrabold text-4xl md:text-5xl leading-tight mb-6 md:mb-16">Proyectos.</h1>
          <div className="grid md:grid-cols-12 gap-7 mb-14">
            <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-8">
              <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-2xl text-gray-800">{firstProject.frontmatter.title}</h2>
                <p className="text-gray-700">{firstProject?.frontmatter.excerpt}</p>
                <div className="block md:hidden relative h-72">
                  <Image
                    className="rounded-lg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top left"
                    src="/static/images/website-expanish-com.png" />
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-bold inline-block uppercase text-sm tracking-widest text-gray-900">Tech Stack</span>
                <span className="inline-block">Ruby, Next.js, React, PostgreSQL</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="font-bold inline-block uppercase text-sm tracking-widest text-gray-900">Tipo de project</span>
                <span className="inline-block">Web Performance</span>
              </div>
              <CustomLink href={`/work/${firstProject.frontmatter.slug}`} className="py-5 px-6 flex items-center justify-center space-x-3 font-semibold text-white bg-gradient-to-tr from-rose-700 to-rose-600 hover:bg-rose-500 rounded-lg">
                <span>Leer caso de estudio</span>
                <ArrowRight className="w-5 h-5" />
              </CustomLink>
            </div>
            <div className="hidden md:grid grid-cols-8 lg:grid-cols-10 gap-3 md:col-span-7 lg:col-span-8">
              <div className="relative col-span-8 lg:col-span-6 row-span-4">
                <Image
                  className="rounded-lg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top left"
                  src="/static/images/website-expanish-com.png" />
              </div>
              <div className="relative col-span-4 row-span-2">
                <Image
                  className="rounded-lg"
                  layout="fill"
                  objectFit="cover"
                  src="/static/images/website-expanish-com.png" />
              </div>
              <div className="relative col-span-4 row-span-2">
                <Image
                  className="rounded-lg"
                  layout="fill"
                  objectFit="cover"
                  src="/static/images/website-expanish-com.png" />
              </div>
            </div>
          </div>
        </Container>
        <section className="py-14">
          <Container className="max-w-screen-lg">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
              {restProjects.map((project, index: number) => 
                <PostWithImage
                  title={project.frontmatter.title}
                  summary={project.frontmatter.excerpt}
                  thumbnail={project.frontmatter.image}
                  href={`/work/${project.frontmatter.slug}`}
                  key={index} />
              )}
            </div>
          </Container>
        </section>
      </section>
    </>
  )
}

export async function getStaticProps({ params }) {
  const projects = await getProjects()

  return {
    props: {
      projects,
    },
  }
}

WorkIndexPage.getLayout = (page: React.ReactElement) => {
  return (
    <BaseLayout>
      {page}
    </BaseLayout>
  )
}