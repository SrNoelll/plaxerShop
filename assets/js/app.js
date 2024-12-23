document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('#header');
  
    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  
    window.addEventListener('scroll', handleScroll);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll("h3[data-target]");
    const duration = 2000; // Duración de la animación en milisegundos
  
    // Función de animación del contador
    function animateCounter(counter) {
      const target = +counter.getAttribute("data-target");
      const increment = target / (duration / 16); // Incremento por cada fotograma (16 ms aprox.)
  
      function updateCounter() {
        const current = +counter.innerText;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      }
  
      updateCounter();
    }
  
    // Configuración del Intersection Observer
    const observerOptions = {
      threshold: 0.5 // Ajusta la visibilidad (50% de la sección visible) para activar la animación
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCounter(counter);
          observer.unobserve(counter); // Dejar de observar después de iniciar la animación
        }
      });
    }, observerOptions);
  
    // Asociar el observer a cada contador
    counters.forEach(counter => {
      observer.observe(counter);
    });
  });
  
  function openModal(image) {
    document.getElementById('modalImage').src = image.src;
    $('#imageModal').modal('show');
  }

/////////////////////////////////  Tienda  //////////////////////////////////////////////
const selectShop = document.querySelector("#tiendas");
const filtroSelec = document.querySelector("#filtros");
const categoriaSelec = document.querySelector("#categoria"); // Nuevo select para categorías
const productos = document.querySelector("#productos");
let baseURL = "https://www.cheapshark.com/api/1.0/deals?pageSize=16&pageNumber=0";

function selectTiendas() {
  fetch("https://www.cheapshark.com/api/1.0/stores")
    .then(res => res.json())
    .then(data => {
      data.forEach(store => {
        if (store.isActive === 1) {
          selectShop.innerHTML += `<option value="${store.storeID}">${store.storeName}</option>`;
        }
      });
      aplicarFiltros();
    });
}

function tiendaPrede(params = [], category = "all") {
  const url = new URL(baseURL);
  params.forEach(param => {
    const [key, value] = param.split("=");
    if (key) url.searchParams.set(key, value || "");
  });

  console.log("URL generada:", url.toString());

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let filteredProducts = data;
      const categoryMap = {
        "Action": [
            "shooter", "zombie", "open-world", "assassin", "auto", "combat", "warfare", 
            "guns", "stealth", "cyberpunk", "melee", "survival", "heist", "spider", 
            "bounty-hunter", "rage", "sci-fi", "race", "tank", "battle-royale", "defense",
            "loot", "missions", "resistance", "heroes", "dungeons", "vigilante", "hack",
            "robots", "adventure", "multiplayer", "clans", "boss", "puzzle", "hacker", 
            "zombies", "infiltration", "trap", "speed", "teamwork", "expansion", "terrain"
        ],
        "Adventure": [
            "puzzle", "treasure", "island", "mystery", "time-travel", "exploration", 
            "ancient", "rescue", "story-driven", "paradise", "quests", "hidden", "eco",
            "darkness", "enchanted", "heart", "lost", "mansion", "trap", "runes", 
            "storm", "clue", "cave", "tower", "danger", "forest", "ghost", "waterfall", 
            "ocean", "fishing", "theft", "courage", "escape", "pursuit", "vengeance", 
            "discovery", "secrets", "illusion", "riddle", "mystic", "temple", "ghosts"
        ],
        "RPG": [
            "dragon", "quest", "sword", "magic", "summon", "kingdom", "dark", "elf", 
            "dungeon", "battle", "heroes", "steampunk", "artifact", "town", "fortress", 
            "gear", "guild", "combat", "elixir", "spell", "warrior", "priest", "bosses", 
            "ancestor", "honor", "race", "legend", "summon", "loot", "realm", "alliance", 
            "champion", "merchant", "potion", "tactics", "relics", "secret", "ranger", 
            "sorcerer", "warlock", "thief", "village", "faction", "siege", "pillage", 
            "destiny", "cursed", "cult", "arcane", "hunt", "huntress", "mentor", "trap"
        ],
        "Strategy and Simulation": [
            "economy", "empire", "war", "city", "defend", "resource", "manage", "alliance",
            "fortress", "battlefield", "tech", "expansion", "diplomacy", "invasion", 
            "siege", "naval", "territory", "mines", "colonize", "region", "build", "army", 
            "plan", "tower", "conquer", "fort", "construction", "infrastructure", "pillage", 
            "trade", "stocks", "land", "colonial", "strategy", "tactic", "builder", 
            "laws", "simulation", "rank", "overcome", "supply", "scout", "recruit", 
            "submarine", "militia", "peace", "gameplay", "leader", "raid", "incursion", 
            "reinforcements", "supply-line", "perimeter", "network", "forest", "trade-off"
        ]
    };
    

      if (category !== "all") {
        const keywords = categoryMap[category] || [];
        filteredProducts = data.filter(product => 
          keywords.some(keyword =>
            product.title.toLowerCase().includes(keyword)
          )
        );
      }

      productos.innerHTML = "";
      if (filteredProducts.length === 0) {
        productos.innerHTML = "<p>No games found for the selected category.</p>";
        return;
      }

      filteredProducts.forEach(element => {
        productos.innerHTML += `
          <div class="col-6 row p-4">
            <div class="col-12 ratio ratio-1x1">
              <img class="img-fluid" src="${element.thumb}" alt="Game image">
            </div>
            <h3>${element.title}</h3>
            <span class="col-6 text-start text-danger text-decoration-line-through">
              $${element.normalPrice}
            </span>
            <span class="col-6 text-end">$${element.salePrice}</span>
            <p class="text-primary">-${parseFloat(element.savings).toFixed(2)}%</p>
            <p>Metacritic: ${element.metacriticScore}</p>
            <a href="${element.metacriticLink}" class="btn btn-primary">Shop Now</a>
          </div>`;
      });
    })
    .catch(err => console.error("Error al cargar los productos:", err));
}

function aplicarFiltros() {
  const storeID = selectShop.value;
  const filterValue = filtroSelec.value;
  const category = categoriaSelec.value;
  const filters = [];

  if (storeID) {
    filters.push(`storeID=${storeID}`);
  }
  switch (Number(filterValue)) {
    case 2:
      filters.push("sortBy=Price");
      break;
    case 3:
      filters.push("sortBy=Price", "desc=1");
      break;
    case 4:
      filters.push("sortBy=Metacritic");
      break;
    case 5:
      filters.push("sortBy=Metacritic", "desc=1");
      break;
    case 6:
      filters.push("sortBy=Savings");
      break;
    case 7:
      filters.push("sortBy=Savings", "desc=1");
      break;
    case 8:
      filters.push("sortBy=Release");
      break;
    case 9:
      filters.push("sortBy=Release", "desc=1");
      break;
  }

  tiendaPrede(filters, category);
}

selectShop.addEventListener("change", aplicarFiltros);
filtroSelec.addEventListener("change", aplicarFiltros);
categoriaSelec.addEventListener("change", aplicarFiltros); // Nuevo evento

selectTiendas();