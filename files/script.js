// ===========================
// ALTERNÂNCIA DE TEMA (CLARO/ESCURO)
// Adiciona/remove a classe "tema-escuro" no <body> e guarda a
// preferência do usuário no localStorage para manter a escolha
// entre visitas ao site.
// ===========================
var temaToggle = document.getElementById('temaToggle');
var BODY = document.body;
var CHAVE_TEMA = 'portfolio-tema';

function aplicarTema(tema) {
  if (tema === 'escuro') {
    BODY.classList.add('tema-escuro');
    if (temaToggle) {
      temaToggle.textContent = '☀️';
      temaToggle.setAttribute('aria-label', 'Alternar para tema claro');
    }
  } else {
    BODY.classList.remove('tema-escuro');
    if (temaToggle) {
      temaToggle.textContent = '🌙';
      temaToggle.setAttribute('aria-label', 'Alternar para tema escuro');
    }
  }
}

// Recupera o tema salvo (se houver) ao carregar a página
var temaSalvo = localStorage.getItem(CHAVE_TEMA);
if (temaSalvo) {
  aplicarTema(temaSalvo);
}

if (temaToggle) {
  temaToggle.addEventListener('click', function () {
    var temaAtual = BODY.classList.contains('tema-escuro') ? 'escuro' : 'claro';
    var novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
    aplicarTema(novoTema);
    localStorage.setItem(CHAVE_TEMA, novoTema);
  });
}

// ===========================
// MENU MOBILE – TOGGLE
// ===========================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
  navLinks.classList.toggle('aberto');
  this.setAttribute('aria-expanded', navLinks.classList.contains('aberto'));
});

// Fecha o menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('aberto');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================
// ANO ATUAL NO RODAPÉ
// ===========================
var anoAtual = document.getElementById('anoAtual');
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

// ===========================
// ANIMAÇÃO DE ENTRADA (Scroll)
// ===========================
function iniciarAnimacoes() {
  var elementos = document.querySelectorAll(
    '.section-title, .sobre-grid, .timeline-item, .projeto-card, .contato-wrapper, .hero-content'
  );

  elementos.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach(function (el) {
    observer.observe(el);
  });
}

// ===========================
// FORMULÁRIO DE CONTATO – VALIDAÇÃO
// ===========================
var form = document.getElementById('contatoForm');

function obterCampo(id) {
  return document.getElementById(id);
}

function mostrarErro(campoId, erroId, mensagem) {
  var campo = obterCampo(campoId);
  var erro = obterCampo(erroId);
  campo.style.borderColor = '#e63946';
  erro.textContent = mensagem;
}

function limparErro(campoId, erroId) {
  var campo = obterCampo(campoId);
  var erro = obterCampo(erroId);
  campo.style.borderColor = '';
  erro.textContent = '';
}

function validarEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarFormulario() {
  var valido = true;

  var nome = obterCampo('nome').value.trim();
  var email = obterCampo('email').value.trim();
  var assunto = obterCampo('assunto').value.trim();
  var mensagem = obterCampo('mensagem').value.trim();

  // Validar nome
  if (nome.length < 3) {
    mostrarErro('nome', 'erroNome', 'Por favor, informe seu nome completo.');
    valido = false;
  } else {
    limparErro('nome', 'erroNome');
  }

  // Validar e-mail
  if (!validarEmail(email)) {
    mostrarErro('email', 'erroEmail', 'Informe um e-mail válido.');
    valido = false;
  } else {
    limparErro('email', 'erroEmail');
  }

  // Validar assunto
  if (assunto.length < 3) {
    mostrarErro('assunto', 'erroAssunto', 'Informe um assunto.');
    valido = false;
  } else {
    limparErro('assunto', 'erroAssunto');
  }

  // Validar mensagem
  if (mensagem.length < 10) {
    mostrarErro('mensagem', 'erroMensagem', 'Sua mensagem deve ter pelo menos 10 caracteres.');
    valido = false;
  } else {
    limparErro('mensagem', 'erroMensagem');
  }

  return valido;
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var sucesso = document.getElementById('formSucesso');
    sucesso.textContent = '';

    if (validarFormulario()) {
      // Simula envio (substitua por fetch/API real se necessário)
      var btnEnviar = form.querySelector('.btn-enviar');
      btnEnviar.textContent = 'Enviando...';
      btnEnviar.disabled = true;

      setTimeout(function () {
        form.reset();
        btnEnviar.textContent = 'Enviar mensagem';
        btnEnviar.disabled = false;
        sucesso.textContent = '✅ Mensagem enviada com sucesso! Entrarei em contato em breve.';

        // Limpa a mensagem de sucesso após 6 segundos
        setTimeout(function () {
          sucesso.textContent = '';
        }, 6000);
      }, 1200);
    }
  });

  // Limpa erros em tempo real ao digitar
  ['nome', 'email', 'assunto', 'mensagem'].forEach(function (id) {
    var campo = obterCampo(id);
    if (campo) {
      campo.addEventListener('input', function () {
        limparErro(id, 'erro' + id.charAt(0).toUpperCase() + id.slice(1));
      });
    }
  });
}

// ===========================
// LINK ATIVO NO SCROLL
// ===========================
function destacarLinkAtivo() {
  var secoes = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a');
  var scrollY = window.scrollY;

  secoes.forEach(function (secao) {
    var topo = secao.offsetTop - 80;
    var altura = secao.offsetHeight;
    var id = secao.getAttribute('id');

    if (scrollY >= topo && scrollY < topo + altura) {
      links.forEach(function (link) {
        link.style.color = '';
        link.style.borderBottomColor = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--cor-acento-claro)';
          link.style.borderBottomColor = 'var(--cor-acento-claro)';
        }
      });
    }
  });
}

window.addEventListener('scroll', destacarLinkAtivo);

// ===========================
// INICIALIZAÇÃO
// ===========================
document.addEventListener('DOMContentLoaded', function () {
  iniciarAnimacoes();
  destacarLinkAtivo();
});
