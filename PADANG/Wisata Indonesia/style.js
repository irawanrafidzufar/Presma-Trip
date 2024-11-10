function reveal(){
    var reveals = document.querySelectorAll(".reveal");
    for(var i = 0;i < reveals.length; i++){
        var elementTop = reveals[i].getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
        var elementVisible = 150;
        if(elementTop < windowHeight - elementVisible){
            reveals[i].classList.add("active");
        }else{
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener('scroll',reveal);

window.onload = function (){
    var images = ["./Image wisata padang/Museum.jpg","./Image wisata padang/Pantai pad.jpg","./Image wisata padang/Bukit Tinggi pad.jpg","./Image wisata padang/pantai ahay.jpg"];
    
    function changeImage(){
        var i = Math.floor(Math.random() * 3);
        document.getElementById("hero").style.backgroundImage = "url('"+ images[i] +"')";
    }
    setInterval(changeImage,5000)
    
}

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.querySelector('#checkbox');
    const body = document.body;

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});