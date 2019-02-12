import * as React from 'react'
import Layout from '../layouts/Layout'

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <div className="flex max-width">
        <div className="flex-col flex-vc text-center">
          <div className="flex-row mvl ">
            <p className="t1 color-black">End-to-End testing <br />finally made simple</p>
          </div>
          <div className="flex-row">
            <p className="t3 color-black">Coming Soon...</p>
          </div>
          <div className="flex-row">
            <img src={require('../assets/images/coming-soon-gateway.svg')} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
