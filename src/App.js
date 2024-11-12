import { useState } from "react";
import './styles.css'
function App() {
  // const[error,setError]=useState('');
  const[data,setData]=useState([]);
  const[city,setCity]=useState('');
  const[temp,setTemp]=useState('');
  const[humidity,setHumidity]=useState('')
  const[condition,setCondition]=useState('')
  const[windSpeed,setWindspeed]=useState('')
  const[Authenticate,setAuthenticate]=useState(false);
  const[loading,setLoading]=useState(false);
  const Key='4445648d80324b968d3180839241111'
  const API=`https://api.weatherapi.com/v1/current.json?key=${Key}&q=${city}`;
  const fetchData=async()=>{
    setAuthenticate(false);
    setLoading(true); 
    try {
      const res=await fetch(API);
      // console.log(res,'hello');
      if(!res.ok){
        // setError('Api not working');
        alert('Failed to fetch weather data');
        setAuthenticate(false);
        setLoading(false); 
      }
      const result=await res.json();
      console.log(result,'result');
      setData(result);
      setAuthenticate(true);
      setTemp(result.current.temp_c);
      setHumidity(result.current.humidity);
      setCondition(result.current.condition.text);
      setWindspeed(result.current.wind_kph);
    } catch (error) {
      alert('Failed to fetch weather data');
    }
    finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };
  const fetchCity=(e)=>{
    const cityy=e.target.value;
    // setCity('');
    setCity(cityy);
    setAuthenticate(false);
  }
  return (
    <>
    <div style={{backgroundColor: 'skyblue', minHeight: '100vh', padding: '20px'}}>
      <div style={{display:'flex', justifyContent:'center',gap:'5px'}}>
      <input placeholder="Enter city name" onChange={fetchCity} value={city}/>
      <button onClick={fetchData} style={{background:'green',color:'white',borderRadius:'3px'}}>Search</button>
      </div>
      {loading && <p style={{textAlign:'center'}}>Loading data...</p>}
      {Authenticate&&(
        <div className="weather-cards">
          <div className="weather-card">
          <h4>Temperature</h4>
          <p>{temp}</p>
          </div>
          <div className="weather-card">
          <h4>Humidity</h4>
          <p>{humidity}</p>
          </div>
          <div className="weather-card">
          <h4>Condition</h4>
          <p>{condition}</p>
          </div>
          <div className="weather-card">
          <h4>Wind Speed</h4>
          <p>{windSpeed}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
