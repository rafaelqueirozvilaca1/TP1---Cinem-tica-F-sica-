/* marca o link atual do menu */
let a = document.querySelectorAll('#menu a');
let linkAtualDoMenu = window.location.href;
a.forEach(aEl => {
    if (aEl == linkAtualDoMenu)
        aEl.classList.add('marcar-pagina-atual');
});