import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>Check Out the Products</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__item">
                        <CardItem 
                        src="/images/oxygentube.jpg"
                        text='Oxygen Tubes'
                        label='Medical'
                        path='/questions'
                        />
                         <CardItem 
                        src="/images/wheelchair.jpg"
                        text='WheelChairs'
                        label='Medical'
                        path='/products'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
