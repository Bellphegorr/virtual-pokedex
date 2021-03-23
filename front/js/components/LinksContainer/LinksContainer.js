const linksContainer = {
    templateUrl: 'js/components/LinksContainer/LinksContainer.html',


    controller($location, TokenService) {
        let vm = this;


        vm.$onInit = function () {
            vm.token = TokenService.cookieToken;
            vm.name = TokenService.localUserName;
            vm.showLoginLink = true;
            vm.showSingupLink = true;

            if (vm.token) {
                vm.showLoginLink = false;
                vm.showSingupLink = false;
            }

            vm.locationUrl = $location.url();

            if (vm.locationUrl == '/login') {
                vm.showLoginLink = false;
            } else if (vm.locationUrl == '/cadastro') {
                vm.showSingupLink = false;
            }
        }


        vm.logout = function () {
            TokenService.removeCoockie();
            $location.path('/login');
        }
    }
};

linksContainer.controller.$inject = ['$location', 'TokenService'];

export default linksContainer;