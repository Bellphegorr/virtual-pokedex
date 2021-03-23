export default class RollOnScroll {
    constructor() {
        this.restrict = 'A'
    }


    link(scope, elem, attrs) {
        window.onscroll = function(){
            var rotation = `translateY(-50%) rotateZ(${window.scrollY / 15}deg)`;
            elem[0].style.transform = rotation;
        }
    }
}