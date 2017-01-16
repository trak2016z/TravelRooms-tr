function sendMail() {
    var link = "mailto:" + escape(document.getElementById('authorEmail').value)
            + "?cc=" + escape(document.getElementById('myEmail').value)
            + "&subject=" + escape(document.getElementById('myTitle').value)
            + "&body=" + escape(document.getElementById('myText').value)
        ;

    window.location.href = link;
}