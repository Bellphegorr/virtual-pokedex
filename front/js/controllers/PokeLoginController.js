export default class PokeLoginController {
    constructor($http, $location, TokenService) {
        this.$http = $http;
        this.$location = $location;

        this.TokenService = TokenService;

        this.email = 'admin@ad.com';
        this.password = '1234567';
        this.invalidAuth = false;
    }


    get url() {
        return 'http://localhost:3000/login';
    }


    login() {
        let login = {
            email: this.email,
            password: this.password
        };

        this.$http.post(this.url, login)
            .then(response => {
                if(!response.data.status) {
                    this.invalidAuth = true;
                    return;
                }

                this.TokenService.cookieToken = response.data.token;
                this.TokenService.localUserName = response.data.name;
                this.$location.path('/forum');
            });
    }
}

PokeLoginController.$inject = ['$http', '$location', 'TokenService'];