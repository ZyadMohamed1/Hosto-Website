import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd'
import FileUpload from '../Utils/FileUpload'

const {Title} = Typography;
const {TextArea} = Input;

const Cities = [
    {key:1, value:"Nasr city"},
    {key:2, value:"Masr Algededa"},
    {key:3, value:"Al tagamo3 al5ames"},
    {key:4, value:"Shobra"},
    {key:5, value:"Alsalam city"},
    {key:6, value:"Al mohandseen"},
    {key:7, value:"AL Giza"},
    {key:8, value:"Alf Maskn"},
]


function UploadProductPage() {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [PhoneValue, setPhoneValue] = useState()
    const [CitiesValue, setCitiesValue] = useState(1)
    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescription = (event) =>{
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onPhoneChange = (event) => {
        setPhoneValue(event.currentTarget.value)
    }
    
    const onCitiesSelect = (event) =>{
        setCitiesValue(event.currentTarget.value)
    }

    const updateImages = (newImages) =>{
        console.log(newImages)
        setImages(newImages)
    }

    return (
        <div className="Con"
        style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Medical Product</Title>
            </div>
            
            <Form onSubmit>

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages}/>

            <br />
            <br />
            <label style={{marginRight:'50px', fontSize:'30px'}}>Title</label>
            <Input style={{fontSize:'20px'}}
            onChange={onTitleChange}
            value={TitleValue}
            />
            <br />
            <br />
            <label style={{marginRight:'50px', fontSize:'30px'}}>Description</label>
            <br />
            <br />
            <textarea style={{height:'100px', width:'500px'}}
                onChange={onDescription}
                value={DescriptionValue}
                />
            <br />
            <br />
            <label style={{marginRight:'50px', fontSize:'30px'}}>Price(LE)</label>
            <Input style={{fontSize:'20px'}}
            onChange={onPriceChange}
            value={PriceValue}
            type="number" 
            />
            <br />
            <br />
            <label style={{marginRight:'50px', fontSize:'30px'}}>Phone Number</label>
            <Input style={{fontSize:'20px'}}
            onChange={onPhoneChange}
            value={PhoneValue}
            type="number" 
            />
            <br />
            <br />

            <select onChange={onCitiesSelect} style={{fontSize:'20px'}}>

                {Cities.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                ))}

            </select>
            <br />
            <br />

            <Button style={{fontSize:'20px'}}>
                Submit
            </Button>


            </Form>


        </div>
    )
}

export default UploadProductPage

// import React, { useState } from 'react'
// import { Typography, Button, Form, message, Input, Icon } from 'antd';


// const { Title } = Typography;
// const { TextArea } = Input;

// const Continents = [
//     { key: 1, value: "Africa" },
//     { key: 2, value: "Europe" },
//     { key: 3, value: "Asia" },
//     { key: 4, value: "North America" },
//     { key: 5, value: "South America" },
//     { key: 6, value: "Australia" },
//     { key: 7, value: "Antarctica" }
// ]

// function UploadProductPage(props) {

//     const [TitleValue, setTitleValue] = useState("")
//     const [DescriptionValue, setDescriptionValue] = useState("")
//     const [PriceValue, setPriceValue] = useState(0)
//     const [ContinentValue, setContinentValue] = useState(1)

//     const [Images, setImages] = useState([])


//     const onTitleChange = (event) => {
//         setTitleValue(event.currentTarget.value)
//     }

//     const onDescriptionChange = (event) => {
//         setDescriptionValue(event.currentTarget.value)
//     }

//     const onPriceChange = (event) => {
//         setPriceValue(event.currentTarget.value)
//     }

//     const onContinentsSelectChange = (event) => {
//         setContinentValue(event.currentTarget.value)
//     }




//     return (
//         <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
//             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//                 <Title level={2}> Upload Travel Product</Title>
//             </div>


//             <Form onSubmit >

//                 {/* DropZone */}
                
//                 <br />
//                 <br />
//                 <label>Title</label>
//                 <Input
//                     onChange={onTitleChange}
//                     value={TitleValue}
//                 />
//                 <br />
//                 <br />
//                 <label>Description</label>
//                 <TextArea
//                     onChange={onDescriptionChange}
//                     value={DescriptionValue}
//                 />
//                 <br />
//                 <br />
//                 <label>Price($)</label>
//                 <Input
//                     onChange={onPriceChange}
//                     value={PriceValue}
//                     type="number"
//                 />
//                 <br /><br />
//                 <select onChange={onContinentsSelectChange} value={ContinentValue}>
//                     {Continents.map(item => (
//                         <option key={item.key} value={item.key}>{item.value} </option>
//                     ))}
//                 </select>
//                 <br />
//                 <br />

//                 <Button
        
//                 >
//                     Submit
//                 </Button>

//             </Form>

//         </div>
//     )
// }

// export default UploadProductPage