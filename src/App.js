import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [information, setInformation] = useState([]);
  const [show, setShow] = useState([-1,10]);

  useEffect(()=>{
    fetch('https://api.datos.gob.mx/v1/condiciones-atmosfericas')
    .then(response => response.json())
    .then(data => setInformation(data.results));
  },[]);

  console.log(information);


  return ( 
    <>
    <ContenedorTabla>
      <div>
      <NombreColumna>ID</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content._id}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>City</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content.cityid}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>Name</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content.name}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>State</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content.state}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>Probability of Precipitation</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content.probabilityofprecip}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>Relative humidity</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content.relativehumidity}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>Last report time</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          return <p key={index}>{content.lastreporttime.slice(0,4)+'/'+content.lastreporttime.slice(4,6)+'/'+content.lastreporttime.slice(6,8)}</p>
        }
      })}
      </div>

      <div>
      <NombreColumna>¿Llueve?</NombreColumna>
      {information.map((content, index)=>{
        if(index < show[1] && index > show[0]){
          if(content.probabilityofprecip>60 || content.relativehumidity>50){
            return <p key={index}>Sí</p>
          } else {
            return <p key={index}>No</p>
        }
        } 
      })}
      </div>
    </ContenedorTabla>
    <ButtonContainer>
      {show[0]>0 && <Button onClick={()=>setShow([show[0]-10, show[1]-10])}> {'<'}10 anteriores</Button>}
      {show[1]<100 && <Button onClick={()=>setShow([show[0]+10, show[1]+10])}>10 siguientes {'>'}</Button>}
    </ButtonContainer>
    </>
    
  );
}


const ContenedorTabla = styled.div`
  display: flex;
  margin: 50px auto;
  align-items: center;
  width: 90vw;
  text-align: center;
  & div {
    width: 500px;
    min-width: 190px;
    height: min-content;
  }
`;



const NombreColumna = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  background-color: #00a;
  height: 80px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 10px auto;
`;

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  height: 40px;
  width: 120px;
`;

 
export default App;