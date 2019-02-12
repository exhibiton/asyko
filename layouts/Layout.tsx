import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string,
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'Asyko - End-to-End Testing made easy' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <div>
          <img src={require('../assets/images/asyko logo.svg')} />
        </div>
      </nav>
    </header>
    {children}
  </div>
)

export default Layout
