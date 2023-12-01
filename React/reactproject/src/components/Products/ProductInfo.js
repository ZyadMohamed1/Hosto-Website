import { Button, Descriptions } from 'antd'
import React from 'react'

function ProductInfo() {
    return (
        <div >
        <Descriptions title="Product Info" style={{ display: 'flex', justifyContent: 'center' }}    >
            <br />
            <Descriptions.Item label="Price: ">50 LE</Descriptions.Item>
            <br />
            <Descriptions.Item label="Sold: ">No</Descriptions.Item>
            <br />
            <Descriptions.Item label="View: "> 0</Descriptions.Item>
            <br />
            <Descriptions.Item label="Description: "> Descriptions</Descriptions.Item>
        </Descriptions>

        <br />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button size="large" shape="round" type="danger"
               
            >
                Add to Cart
                </Button>
        </div>
    </div>
    )
}

export default ProductInfo
