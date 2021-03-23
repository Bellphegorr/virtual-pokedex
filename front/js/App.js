//Config
import NgQuill from './configs/ng-quill.js';

//Router
import RouteProvider from './Routes.js';

//Services
import PokeApiService from './services/PokeApiService.js';
import TokenService from './services/TokenService.js';
import CreateForumService from './services/CreateForumService.js';

//Controllers
import PokeDexController from './controllers/PokeDexController.js';
import PokeInfoController from './controllers/PokeInfoController.js';
import PokeLoginController from './controllers/PokeLoginController.js';
import PokeSingUpController from './controllers/PokeSingUpController.js';
import PokeForumListController from './controllers/PokeForumListController.js';
import PokeForumController from './controllers/PokeForumController.js';
import PokeCreateForumController from './controllers/PokeCreateForumController.js';


//Directives
import RollOnScroll from './directives/RollOnScrollDirective.js';
import FocusPokemonDirective from './directives/FocusPokemonDirective.js';


//Components
import PkmListItemComponentes from './components/PokeListItem/PokeListItem.js';
import LinksContainer from './components/LinksContainer/LinksContainer.js';

//Filters
import NumberFormatter from './filters/NumberFormat.js';


(angular => {
    let app = angular.module('pokedexApp', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngQuill'])
        .config(RouteProvider)
        .service('PokeApiService', PokeApiService)
        .service('TokenService', TokenService)
        .service('CreateForumService', CreateForumService)
        .controller('PokeDexController', PokeDexController)
        .controller('PokeInfoController', PokeInfoController)
        .controller('PokeLoginController', PokeLoginController)
        .controller('PokeSingUpController', PokeSingUpController)
        .controller('PokeForumListController', PokeForumListController)
        .controller('PokeForumController', PokeForumController)
        .controller('PokeCreateForumController', PokeCreateForumController)
        .directive('rollOnScroll', RollOnScroll)
        .directive('focusPokemon', FocusPokemonDirective)
        .component('pokeListItemComponent', PkmListItemComponentes)
        .component('linksContainer', LinksContainer)
        .filter('NumberFormatter', NumberFormatter.formater);

    angular.bootstrap(document, ['pokedexApp']);
})(angular);