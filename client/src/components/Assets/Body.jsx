import React from 'react'
import AssetsList from './AssetsList'
import PageHeader from './PageHeader'

const Body = () => {
    return (
        <div className="section-body">
            <PageHeader />
            <AssetsList/>
        </div>
    )
}

export default Body