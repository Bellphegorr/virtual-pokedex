export default class PokeCreateForumController {
    constructor($http, $location, TokenService) {
        this.$http = $http;
        this.$location = $location;
        this.TokenService = TokenService;

        this.title = '';
        this.content = '';
        this.showError = false;
        this.invalidTitle = false;
        this.invalidContent = false;
        this.editor;

        this.editorModules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'align': [] }],
            ]
        };
    }

    get url() {
        return 'http://localhost:3000/createForum';
    }

    getValue() {
        let image64 = '',
            regexData = /(data\:image\/png\;base64\,)/,
            imageConverted = '';

        this.content = this.editor.getContents();
        image64 = this.content.ops[0].insert.image.replace(regexData, '');
        this.image = image64;

        console.log(this.content.ops[0].insert.image);
    }

    setValue() {
        // this.editor.setContents(this.content);
        console.log(this.content);
    }

    editorCreated(editor) {
        this.editor = editor;
    }

    publishForum() {
        if (!this.title) {
            this.invalidTitle = true;
        } else {
            this.invalidTitle = false;
        }

        if (!this.content) {
            this.invalidContent = true;
        } else {
            this.invalidContent = false;
        }

        if (!this.title || !this.content) {
            return false;
        }

        let createForumObject = {
            title: this.title,
            content: this.content
        };

        let token = this.TokenService.cookieToken;

        this.$http.post(this.url, createForumObject, { headers: { AUTHORIZATION: `BEARER ${token}` } })
            .then(response => {
                let data = response.data;
                this.$location.path(`/forum/${data._id}`);
            });
    }
}

PokeCreateForumController.$inject = ['$http', '$location', 'TokenService'];