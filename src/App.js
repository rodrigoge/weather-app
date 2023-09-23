import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { AiOutlineSearch } from 'react-icons/ai';

const api = {
  key: `${process.env.SECRET_API}`,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month} de ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp > 16 ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <div className="search-bar-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Pesquisar"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
            <AiOutlineSearch 
              size={16}
            />
          </div>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country} 
                
                <ReactCountryFlag
                  countryCode={weather.sys.country}
                  style={{
                    width: '20px',
                    height: '20px',
                    marginLeft: '8px',
                  }}
                  svg
                />
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°
              </div>
              <div>
                Agora
              </div>
            </div>

            <div className="min-max-box">
              <div className="temp-box">
                <div className="temp-value">{Math.round(weather.main.humidity)}°</div>
                <div className="temp-info">Umidade</div>
              </div>

              <div className="temp-box">
                <div className="temp-value">{Math.round(weather.main.temp_min)}°</div>
                <div className="temp-info">Temp. Mínima</div>
              </div>

              <div className="temp-box">
                <div className="temp-value">{Math.round(weather.main.temp_max)}°</div>
                <div className="temp-info">Temp. Máxima</div>
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
