document.addEventListener("DOMContentLoaded", () => {
  
    const apiURL = "https://swapi.dev/api/"
    const characters = document.getElementById("ull")
    characters.classList.add('yaz')
    document.body.appendChild(characters)
    const loader = document.querySelector("#loading");
    const wrap = document.createElement("div")
    let count = 1
    
  
  
  
  
    async function setCharacters(){
      displayLoading()
  
      const response = await fetch(`${apiURL}people/`) 
      const data = await response.json()
  
        data.results.map(nm => {
          const { name } = nm
            const listItems = document.createElement("li")
              listItems.value = count ++
                listItems.innerText = name
                  characters.appendChild(listItems)
            })
            hideLoading()
  
    }
    
    async function getPlanet(id){
      displayLoading()
       const response = await fetch(`${apiURL}planets/${id}`)
        const data = await response.json()
        hideLoading()
         return data
      
    }
  
    async function setDetails(id) {
      displayLoading()
        const response = await fetch(`${apiURL}people/${id}`)
         const data = await response.json()
      
         const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld } = data
         const planet = await getPlanet(homeworld.slice(-3))
         
        wrap.innerHTML = `
        <ul class="list-group"> <h1> Details </h1>
          <li class="list-p">${name}</li>
          <li class="list-p">Height: ${height}</li>
          <li class="list-p">Mass: ${mass}</li>
          <li class="list-p">Hair Color: ${hair_color}</li>
          <li class="list-p">Skin Color: ${skin_color}</li>
          <li class="list-p">Eye Color: ${eye_color}</li>
          <li class="list-p">Birth Year: ${birth_year}</li>
          <li class="list-p">Gender: ${gender}</li>
          <li class="list-planet">Homeworld: ${planet.name} </li>
          <li class="list-plt">OG-Population: ${planet.residents.length}</li>
          <li class="list-plt">Rotation period: ${planet.rotation_period}</li>
          <li class="list-plt">Orbital period: ${planet.orbital_period}</li>
          <li class="list-plt">Diameter: ${planet.diameter}</li>
          <li class="list-plt">Climate: ${planet.gravity}</li>
          <li class="list-plt">Gravity: ${planet.climate}</li>
          <li class="list-plt">Terrain: ${planet.terrain}</li>
        </ul>
        `;
        characters.after(wrap)
    }
    hideLoading()
  
  
    characters.addEventListener("click", (event) => {
      displayLoading()
      setDetails(event.target.value)
      wrap.innerText = '' 
      hideLoading()
    })
   
   
    function displayLoading() {
      loader.classList.add("display");
             }
    
     function hideLoading() {
       loader.classList.remove("display");
  }
  
  
  
  
    setCharacters()
    
  });
  
  
  
  
  
  
  
  
  
  
  
  