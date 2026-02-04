// Inicializar Ícones Lucide
lucide.createIcons();

// Sugestão de Animação 1: Revelar elementos ao scroll (Scroll Reveal)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Sugestão de Animação 2: Smooth Scroll para os links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const form = document.querySelector(".formulario-contato form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Impede de abrir a tela de "Thanks" do Formspree
  
  const data = new FormData(event.target);
  const btn = document.getElementById("btn-submit");
  
  // Feedback visual de carregamento
  btn.innerText = "Enviando...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // 1. Sucesso: Mensagem positiva
      status.innerHTML = "✅ Solicitação enviada com sucesso!";
      status.style.color = "#2ECC71";
      status.style.display = "block";
      
      // 2. LIMPA O FORMULÁRIO
      form.reset(); 
      
      // 3. Volta o botão ao normal após 3 segundos
      setTimeout(() => {
          status.style.display = "none";
          btn.innerText = "Enviar para Engenharia";
          btn.style.opacity = "1";
          btn.disabled = false;
      }, 5000);

    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "❌ Ocorreu um erro ao enviar.";
        }
        status.style.color = "red";
        status.style.display = "block";
      });
    }
  }).catch(error => {
    status.innerHTML = "❌ Erro de conexão com o servidor.";
    status.style.color = "red";
    status.style.display = "block";
  });
});

// Animação Extra: Efeito de digitação no título (Opcional)
// Poderia ser usado para listar protocolos: MQTT, Modbus, OPC UA...