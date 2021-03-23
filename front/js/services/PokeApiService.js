export default class PokeApiService {
    pkmList = [];

    constructor($http) {
        this.$http = $http;
    }

    get url() {
        return 'http://localhost:3000/'
    }

    listAll() {
        return this.$http.get(`${this.url}`)
            .then(response => response.data)
            .then(pkmList => {
                return pkmList.map(pokemon => {
                    pokemon.number = this.getNumberFromURL(pokemon.resource_uri);
                    return pokemon;
                })
                    .filter(pokemon => pokemon.number < 1000)
                    .sort((a, b) => (a.number > b.number ? 1 : -1))
            })
            .then(pkmList => {
                this.pkmList = pkmList;
                return pkmList;
            })
    }

    getPkm(pkm) {
        return this.$http.get(`${this.url}pokemon/${pkm.number}`)
            .then(response => response.data);
    }

    getNumberFromURL(url) {
        return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
    }
}

PokeApiService.$inject = ['$http'];