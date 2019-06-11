import React from 'react'
import Button from '../Button'
import './index.sass'
import Maps from '../Maps'

function Start({ handleProducts }) {
    return (
        <section className='g-Order__Start' >
            <Button className='g-Order__Start-button' start={true} primary={true} click={handleProducts} />
            <Maps />
        </section>
    )
}

export default Start