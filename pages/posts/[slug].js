import fs from "fs"
import path from "path"
import Layout from "../../components/Layout"
import { listContentFiles, readContentFile } from "../../lib/content-loader"
import styles from "../../styles/posts.module.css"

export default function Post(params) {
  return (
    <Layout title={params.title}>
      <div className={styles.postMedia}>
        <span>{ params.published }</span>
      </div>
      <div
        className={styles.postBody}
        dangerouslySetInnerHTML={{ __html: params.content }}
      />
    </Layout>
  )
}

/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const content = await readContentFile({ fs, slug: params.slug })

  return {
    props: {
      ...content
    }
  }
}

/**
 * 有効な URL パラメータを全件返す
 * paths: 有効なURLパラメータを指定したオブジェクトの配列
 * fallback: 指定されなかったパスに対して404を返すかの真偽値
 */
export async function getStaticPaths() {
  const paths = listContentFiles({ fs })
    .map((filename) => ({
      params: {
        slug: path.parse(filename).name,
      }
    }))

    return { paths, fallback: false }
}
