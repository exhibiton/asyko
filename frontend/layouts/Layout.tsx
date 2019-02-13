import * as React from 'react'
import Head from 'next/head'
import '../styles/core.scss'

type Props = {
  title?: string,
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'Asyko - End-to-End Testing made easy' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800" rel="stylesheet" />
    </Head>
    <header>
      <nav>
        <div className="mlxl mts">
          <img src={require('../assets/images/asykologo.svg')} />
        </div>
      </nav>
    </header>
    {children}
  </div>
)

export default Layout
