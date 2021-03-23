export default class PokeForumController {
    constructor($http, $routeParams, $sce) {
        this.$http = $http;
        this.$routeParams = $routeParams;
        this.$sce = $sce;

        this.forumId = this.$routeParams.forumId;
        this.forum = null;

        this.getForum();
    }

    get url() {
       return 'http://localhost:3000/forum/' 
    }

    getForum() {
        this.$http.get(this.url + this.forumId)
            .then(response => {
                this.forum = response.data;
                this.forum.content = this.$sce.trustAsHtml(this.forum.content);
            });
    }
}

PokeForumController.$inject = ['$http', '$routeParams', '$sce'];