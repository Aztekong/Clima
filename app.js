window.addEventListener('load', ()=> {
    const temperaturaValor = document.getElementById('temperatura-valor')
    const temperaturaDescripcion = document.getElementById('temperatura-descripcion')
  
    const ubicacion = document.getElementById('ubicacion')
    const iconoAnimado = document.getElementById('icono-animado')
  
    const vientoVelocidad = document.getElementById('viento-velocidad')
  
    console.log(navigator.geolocation)
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( posicion => {
        console.log(posicion.coords)
        const lon = posicion.coords.longitude
        const lat = posicion.coords.latitude
        // Ubicacion Actual
        //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=40c4ceb478a6639f941d8896f0e8fcc3`

        //const url = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=40c4ceb478a6639f941d8896f0e8fcc3`
         // Ubicacion por ciudad
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=40c4ceb478a6639f941d8896f0e8fcc3'
  
        console.log(url)
        fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                //console.log(data)
                
                let temp = Math.round(data.main.temp)
                //console.log(temp)
                temperaturaValor.textContent = `${temp} °C`

                //console.log(data.weather[0].description)
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                
                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                
                //para iconos estáticos
                //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`                     
                //icono.src = urlIcon
                //console.log(data.weather[0].icon)

                //para iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case `Thunderstorm`:
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})