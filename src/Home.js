import React, { useState, useEffect} from 'react';
import './Home.css';

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isError, setIsError] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let imageSource = isMobile
  ? '/assets/images/illustration-sign-up-mobile.svg'
  : '/assets/images/illustration-sign-up-desktop.svg';

  function handleChange (event) {
    setIsError(false);
    setInput(event.target.value);
  }

  function check_email(){
    if (/\S+@\S+\.\S+/.test(input) == true){
      setIsSubscribe(true);
    }
    else{
      setIsError(true);
    }
  }

  function close_pop(){
    setIsSubscribe(false);
  }

  return (
    <>
      {
        isSubscribe == false ? (
          <div className='card'>
            <div className='information'>
              <div className='row'>
                <h1>Stay updated!</h1>
              </div>

              <br />

              <div className='row'>
                <p>Join 60,000+ product managers receiving monthly updates on:</p>
              </div>

              <br />

              <div className='row'>
                <li>
                  <img src='/assets/images/icon-list.svg' />
                  <p>Product discovery and building what matters</p>
                </li>
                <li>
                  <img src='/assets/images/icon-list.svg' />
                  <p>Measuring to ensure updates are a success</p>
                </li>
                <li>
                  <img src='/assets/images/icon-list.svg' />
                  <p>And much more!</p>
                </li>
              </div>

              <br /> <br />

              <div className='row input_row'>
                <div className='group'>
                  <p>Email address</p>
                  {
                    isError == true?(
                      <p className='error'>Valid email required</p>
                    ):(<></>)
                  }
                </div>
                {
                  isError == true?(
                    <input className='input_error' type="email" placeholder='email@company.com' value={input} onChange={handleChange} required/>
                  ):(
                    <input type="email" placeholder='email@company.com' value={input} onChange={handleChange} required/>
                  )
                }
              </div>

              <br />
              <div className='row'>
                <button onClick={check_email}>Subscribe to monthly newsletter</button>
              </div>

            </div>
            <div className='image'>
              <img src={imageSource}/>
            </div>
          </div>
        ):(
          <>
            <div className='card_confirm'>
              <div className='row'>
                <img src='/assets/images/icon-list.svg' />
              </div>
              <div className='row'>
                <h1>Thanks for subscribing!</h1>
              </div>
              <div className='row'>
                <p>A confirmation email has been sent to <b>{input}</b>. Please open it and click the button inside to confirm your subscription.</p>
              </div>
              <div className='row specialrow'>
                <button onClick={close_pop}>Dismiss message</button>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default Home;
