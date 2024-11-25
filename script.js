console.log('we are in');

let theme = localStorage.getItem('theme');
if (theme == null) {
    setTheme('light');
} else {
    setTheme(theme);
}

let themeDots = document.getElementsByClassName('theme-dot');

for (var i = 0; themeDots.length > i; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.dataset.mode;
        console.log('Option clicked:', mode);
        setTheme(mode);
    });
}

function setTheme(mode) {
    if (mode == 'light') {
        document.getElementById('theme-style').href = 'default.css';
    }

    if (mode == 'blue') {
        document.getElementById('theme-style').href = 'blue.css';
    }

    if (mode == 'green') {
        document.getElementById('theme-style').href = 'green.css';
    }

    if (mode == 'purple') {
        document.getElementById('theme-style').href = 'purple.css';
    }
    localStorage.setItem('theme', mode);
}



// Alternar visibilidade do menu ao clicar no botão
document.getElementById("menu-button").addEventListener("click", function () {
    var menu = document.querySelector(".menu");
    menu.classList.toggle("show"); // Alterna a visibilidade do menu
});

// Fechar o menu ao clicar em qualquer link (classe "menu-btn")
let menuLinks = document.querySelectorAll(".menu-btn");
menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        var menu = document.querySelector(".menu");
        menu.classList.remove("show"); // Fecha o menu
    });
});

// Fechar o menu ao clicar em fora do menu

window.addEventListener("click", function (e) {
	var menu = document.querySelector(".menu");
	if (e.target != menu && e.target != document.getElementById("menu-button")) {
		menu.classList.remove("show"); // Fecha o menu
	}
}
);
