export default class RouteProvider {
    constructor($routeProvider, $qProvider) {
        this.$routeProvider = $routeProvider;
        this.$qProvider = $qProvider;
        this.routeProvider();
    }

    routeProvider() {
        this.$qProvider.errorOnUnhandledRejections(false);

        this.$routeProvider
            .when('/pokedex', {
                templateUrl: 'js/templates/PokeDexView.html',
                controller: 'PokeDexController as vm'
            })
            .when('/pokedex/:pokeNumber', {
                templateUrl: 'js/templates/PokeInfoView.html',
                controller: 'PokeInfoController as vm'
            })
            .when('/login', {
                templateUrl: 'js/templates/PokeLoginView.html',
                controller: 'PokeLoginController as vm'
            })
            .when('/cadastro', {
                templateUrl: 'js/templates/PokeSingUpView.html',
                controller: 'PokeSingUpController as vm'
            })
            .when('/forum', {
                templateUrl: 'js/templates/PokeForumListView.html',
                controller: 'PokeForumListController as vm'
            })
            .when('/forum/:forumId', {
                templateUrl: 'js/templates/PokeForumView.html',
                controller: 'PokeForumController as vm'
            })
            .when('/criar-forum', {
                templateUrl: 'js/templates/PokeCreateForumView.html',
                controller: 'PokeCreateForumController as vm',
                resolve: {
                    authCreateForum: [
                        'CreateForumService', 
                        '$location', 
                        async function(CreateForumService, $location) {
                            let response = await CreateForumService.verifierAuthorization(),
                                data = response.data;

                            if (!data.status) {
                                $location.path('/forum');
                                alert('Você não pode criar um fórum no momento. Tente no futuro ou contate um administrador.')
                            }
                        }
                    ]
                }
            })
            .otherwise({
                redirectTo: '/pokedex'
            });
    }
}

RouteProvider.$inject = ['$routeProvider', '$qProvider'];