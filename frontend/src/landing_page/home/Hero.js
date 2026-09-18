import React from 'react';

function Hero() {
    return ( 
        <div className="container p-5">
            <div className="row text-center">
                <img src="images/homeHero.png" alt="Hero Image" className="mb-5" />
                <h1 mt-5>Invest in everything</h1>
                <p>online platform to invest in stocks, derivatives, mutual funds </p>
                <button className="btn btn-primary p-2 fs-5" style={{width:"25%",margin:"0 auto"}}>Start Investing</button>

            </div>
        </div>
     );
}

export default Hero;
