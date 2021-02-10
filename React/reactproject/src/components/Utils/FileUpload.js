import Icon from '@ant-design/icons/lib/components/Icon'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Axios from 'axios'


function FileUpload(props) {

    const [Images, setImages] = useState([])

const onDrop = (files) =>{
    let formData = new FormData();
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    //Save the Image inside node server
    Axios.post('/api/product/UploadImage', formData ,config)
    .then(response => {
        if(response.data.success){

            setImages([...Images, response.data.image])
            props.refereshFunction([...Images, response.data.image])

        }else{
            alert('Failed to save the Image in Server')
        }
    })


}


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={800000000}
        >
            {({ getRootProps, getInputProps }) => (
                <div style={{
                    width: '300px', height: '240px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                    {...getRootProps()}
                >
                    {console.log('getRootProps', { ...getRootProps() })}
                    {console.log('getInputProps', { ...getInputProps() })}
                    <input {...getInputProps()} />
                    <i class="fas fa-plus" style={{fontSize:'3rem'}}/>
                    {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}

                </div>
            )}
        </Dropzone>

        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                    <div onClick>
                        <img />
                    </div>

                </div>


        </div>
    )
}

export default FileUpload
