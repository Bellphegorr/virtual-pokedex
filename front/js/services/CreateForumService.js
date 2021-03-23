export default class CreateForumService {
    constructor($http, TokenService) {
        this.$http = $http;
        this.TokenService = TokenService;
    }

    get url() {
        return 'http://localhost:3000/authorized-creat-forum';
    }

    verifierAuthorization() {
        let token = this.TokenService.cookieToken;

        return this.$http.get(this.url, { headers: { AUTHORIZATION: `BEARER ${token}` } });
    }
}

CreateForumService.$inject = ['$http', 'TokenService'];