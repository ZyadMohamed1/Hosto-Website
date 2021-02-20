import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

function DetailProductPage() {

    // useEffect=>(() => {
    //     // Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)

    // }, [])

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1>Product title</h1>
        </div>

        <br />

        <Row gutter={[16, 16]} >
            <Col lg={12} xs={24}>
                <ProductImage />
            </Col>
            <Col lg={12} xs={24}>
                <ProductInfo/>
            </Col>
        </Row>
    </div>
    )
}

export default DetailProductPage
