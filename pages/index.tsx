import * as React from 'react'
import Layout from '../layouts/Layout'

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <div>
        <h1>End-to-End testing finally made simple</h1>
        <p>Coming Soon...</p>
        <div>
          <img src={require('../assets/images/coming-soon-gateway.svg')} />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
