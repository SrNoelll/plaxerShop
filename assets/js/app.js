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
function tiendaPrede(pageNum,parametros) {
const productos = document.querySelector("#productos")
let url = 'https://www.cheapshark.com/api/1.0/deals?pageSize=16&pageNumber='
url+=pageNum
parametros.forEach(element => {
  url+='&'+element+'&'
});
console.log(url)
fetch(url)
.then(res => res.json())
.then(data => {
  let datos = data
  console.log(datos)
  productos.innerHTML=''
  datos.forEach(element => {
    productos.innerHTML += `<div class="col-6" style="height: 300px;"><img class="img-fluid" style="width: 100%; height: 100%;" src="${element.thumb}" alt=""></div>`
  });
  
})
}
const filtroSelec = document.querySelector('#filtros')
tiendaPrede(1,[]);
filtroSelec.addEventListener('change', (event) => {
  switch (Number(event.target.value)) {
    case 1:
      tiendaPrede(1,[]);
    break;
    case 2:
      tiendaPrede(1,["sortBy=Price"]);
    break;
    case 3:
      tiendaPrede(1,["sortBy=Price","desc=1"]);
    break;
    case 4:
      tiendaPrede(1,["sortBy=Metacritic"]);
    break;
    case 5:
      tiendaPrede(1,["sortBy=Metacritic","desc=1"]);
    break;
    case 6:
      tiendaPrede(1,["sortBy=Savings"]);
    break;
    case 7:
      tiendaPrede(1,["sortBy=Savings","desc=1"]);
    break;
    case 8:
      tiendaPrede(1,["sortBy=Release"]);
    break;
    case 9:
      tiendaPrede(1,["sortBy=Release","desc=1"]);
    break;
  }
});


//filtrar por tienda
//steam
//tiendaPrede(1,["storeID=1"]);
