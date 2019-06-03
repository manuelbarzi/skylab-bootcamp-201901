import React from 'react'


function Landing({onRegister, onLogin}){

    return <main >
        <div >
            <section >
                <div >   
                    <p >Dashboard Issues</p>
                    <p  onClick={e => e.preventDefault()}>
                        <a  href="register" onClick={() => onRegister()}>Sign Up</a>
                        <a  href="login" onClick={() => onLogin()}>Sign In</a>
                    </p>
                </div>
            </section>
        </div>
    </main>

}

export default Landing