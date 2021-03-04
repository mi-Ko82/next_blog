import fs from "fs"
import Link from "next/link"
import Layout from "../components/Layout"
import { readContentFiles } from "../lib/content-loader"
import styles from "../styles/Home.module.css"

export default function Home(props) {
  const { posts, hasArchive } = props

  return (
    <Layout title="">
      {posts.map(post => <div
        key={post.slug}
        className={styles.postTeaser}
      >
        <h2><Link href="/posts/[id]" as={`/posts/${post.slug}`}><a className={styles.postTeaser__link}>{post.title}</a></Link></h2>
        <div><span>{post.published}</span></div>
      </div>)}

      {hasArchive ? (
        <div className={styles.homeArchive}>
          <Link href="/archive/[page]" as="/archive/1"><a>アーカイブ</a></Link>
        </div>
      ) : ``}
    </Layout>
  )
}

/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const MAX_COUNT = 5
  const posts = await readContentFiles({ fs })
  const hasArchive = posts.length > MAX_COUNT

  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
      hasArchive,
    }
  }
}
