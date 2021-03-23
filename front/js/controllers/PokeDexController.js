export default class PokeDexController {
    constructor(PokeApiService) {
        this.searchText = '';
        this.pkmList = '';
        this.PokeApiService = PokeApiService;
        this.httpPkmList();
    }

    httpPkmList() {
        if(this.PokeApiService.pkmList.length) {
            this.pkmList = this.PokeApiService.pkmList;
        }
        else {
            this.PokeApiService.listAll()
                .then(pkmList => this.pkmList = pkmList);
        }
    }
}

PokeDexController.$inject = ['PokeApiService'];