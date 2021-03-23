export default class PokeForumController {
    constructor($http, $location, TokenService) {
        this.$http = $http;
        this.$location = $location;
        this.TokenService = TokenService;

        this.forumList = [];
        this.showCreateForumButton = false;

        this.onInit();
        this.getList();
    }

    get url() {
        return 'http://localhost:3000/forum'
    }

    getList() {
        this.$http.get(this.url)
            .then(response => {
                this.forumList = response.data;
            });
    }

    go() {
        this.$location.path('/criar-forum');
    }

    onInit() {
        let token = this.TokenService.cookieToken;
        
        if(token) {
            this.showCreateForumButton = true;
        }
    }
}

PokeForumController.$inject = ['$http', '$location', 'TokenService'];