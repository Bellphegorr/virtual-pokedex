export default class PokeLoginController {
    constructor($http, $location, TokenService) {
        this.$http = $http;
        this.$location = $location;

        this.TokenService = TokenService;

        this.email = 'example@example.com';
        this.password = '12345';
        this.name = 'exemplo';
        this.invalidAuth = false;
    }


    get url() {
        return 'http://localhost:3000/singup';
    }


    singUp() {

        let validationObj = this._validate();

        if (!validationObj.validation) {
            this.invalidMssg = validationObj.mssg;
            this.invalidAuth = true;
            return false;
        }

        let singUp = {
            email: this.email,
            password: this.password,
            name: this.name
        };

        this.$http.post(this.url, singUp)
            .then(response => {
                if (!response.data.status) {
                    this.invalidMssg = response.data.mssg;
                    this.invalidAuth = true;
                    return;
                }

                this.$location.path('/login');
            });
    }

    _validate() {
        if (!this.email) {
            return { validation: false, mssg: 'Digite um e-mail' }
        } else if (!this.password) {
            return { validation: false, mssg: 'Digite uma senha' }
        } else if (!this.name) {
            return { validation: false, mssg: 'Digite um nome de usuário' }
        }

        return { validation: true };
    }
}

PokeLoginController.$inject = ['$http', '$location', 'TokenService'];