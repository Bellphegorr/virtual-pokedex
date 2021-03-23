class PokeInfoController {

    constructor($routeParams, PokeApiService) {
        this.pkm = {};
        this.PokeApiService = PokeApiService;
        this.$routeParams = $routeParams;

        this.getPkm();
    }

    
    getPkm() {
        if(this.PokeApiService.pkmList.length) {
            this.setPkm(this.PokeApiService.pkmList);
        }
        else {
            this.PokeApiService.listAll().then(this.setPkm);
        }
    }


    setPkm(pkmList) {
        let pkm = pkmList.find(pkm => pkm.number == this.$routeParams.pokeNumber);
        if(pkm) {
            this.PokeApiService.getPkm(pkm)
                .then(info => {
                    pkm.info = info[0];
                    this.pkm = pkm;
                });
        }
    }
}

PokeInfoController.$inject = ['$routeParams', 'PokeApiService'];
export default PokeInfoController;