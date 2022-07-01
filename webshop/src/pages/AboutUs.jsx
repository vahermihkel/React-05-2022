import { useState } from "react";
import { useRef } from "react";

// ffc + enter
function AboutUs() {
  const nameRef = useRef();
  const starsRef = useRef();
  const messageRef = useRef();
  const [starNumber, setStarNumber] = useState(5);

  const sendEmail = () => {
    window.Email.send({
      Host : "smtp.elasticemail.com",
      Username : "mihkelvaher@hotmail.com",
      Password : "5FC3511BB7B2CEA5E5E786B9BB88F93C1DDE",
      To : 'vahermihkel@gmail.com',
      From : "vahermihkel@gmail.com",
      Subject : "Sulle tuli tagasiside",
      Body : `Sulle kirjutas: ${nameRef.current.value}, 
        Tema tagasiside: ${starsRef.current.value} tärni, 
        Sisu: ${messageRef.current.value} `
    }).then(
      message => alert(message)
    );
  }

  const starChanged = () => {
    setStarNumber(starsRef.current.value);
  }

  return ( 
  <div>
    <label>Sinu nimi</label> <br />
    <input type="text" ref={nameRef} /> <br />
    <label>Mitu tärni meile annad</label> <br />
    <input type="range" ref={starsRef} onChange={starChanged} defaultValue="5" min="1" max="5" />
    <span>{starNumber}</span> <br />
    <label>Sinu sõnum</label> <br />
    <input type="text" ref={messageRef} /> <br />
    <button onClick={sendEmail}>Saada e-mail</button>
  </div> );
}

export default AboutUs;