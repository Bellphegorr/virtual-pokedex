export default class FocusPokemonDirective {
    constructor() {
        this.restrict = 'A'
    }


    link(scope, elem, attrs) {
        elem[0].addEventListener('mouseover', event => {
            let $this= event.target;

            let animationUp = setInterval(focusAnimationUp, 10),
                animationDown,
                margin = 0;

            function focusAnimationUp() {
                if(margin > 35) {
                    clearInterval(animationUp);
                    animationDown = setInterval(focusAnimationDown, 10)
                }

                margin++;
                $this.style.marginTop = `-${margin}px`;     
            }

            function focusAnimationDown() {
                if(margin < 0) {
                    clearInterval(animationDown);
                }

                margin--;
                $this.style.marginTop = `-${margin}px`;     
            }
        });
    }
}