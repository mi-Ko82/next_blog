import Head from "next/head"
import Link from "next/link"
import styles from "../styles/layout.module.css"

const Layout = (props) => {
  const { title, children } = props
  const siteTitle = 'Next.jsでJAMstackなブログの作成'

  return (
    <div className={styles.page}>
      <Head>
        <title>{ title ? `${title} | ${siteTitle}` : siteTitle }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.siteTitle}>
          <Link href="/">
            <a>{ siteTitle }</a>
          </Link>
        </h1>
      </header>

      <main>
        { title ? <h1 className={styles.pageTitle}>{ title }</h1> : `` }
        <div className={styles.pageMain}>
          { children }
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; { siteTitle }
      </footer>
    </div>
  )
}

export default Layout