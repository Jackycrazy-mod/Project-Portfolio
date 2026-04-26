//define function onclick menu button to display menu
var value_menu = document.getElementById("menu");
var header = [...document.getElementsByTagName("header")][0];
value_menu.onclick = () => {
    if (value_menu.classList.contains('fa-times')) {
        value_menu.classList.remove('fa-times');
        header.classList.remove('toggle');
    } else {
        value_menu.classList.add('fa-times');
        header.classList.add('toggle');
    };
};

//define function of scroll animation smoother
//var sections = [...document.getElementsByTagName('section')];
//var links = [...document.getElementsByTagName("a")].filter(el => el.href.includes("#"));
//for (var link of links) {
//    link.onclick = (e) => {
//        e.preventDefault();
//        var section = e.target.href.split("#")[1];
//        sections.find(el => el.classList.contains(section))?.scrollIntoView({ behavior: "smooth" });
//    }
//};