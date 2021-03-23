export default class TokenService {
    constructor($cookies) {
        this.$cookies = $cookies;

        this.cookieToken;
        this.userName = '';
    }


    get coockieName() {
        return 'pokeDexEngSoftProject';
    }


    set cookieToken(token) {
        this.$cookies.put(this.coockieName, token);

        return true;
    }


    get cookieToken() {
        return this.$cookies.get(this.coockieName);
    }


    get localUserName() {
        return localStorage.pokedexLocalStorageUserName;
    }


    set localUserName(name) {
        return localStorage.pokedexLocalStorageUserName = name;
    }


    removeCoockie() {
        this.$cookies.remove(this.coockieName);
        return true;
    }
}

TokenService.$inject = ['$cookies'];