export default class NgQuill {
    constructor(ngQuillConfigProvider) {
        this.ngQuillConfigProvider = ngQuillConfigProvider;

        this.ngQuillConfigs = {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean'],                                         // remove formatting button
                    ['link', 'image', 'video']                         // link and image, video
                ]
            },
            theme: 'snow',
            debug: 'warn',
            placeholder: '',
            readOnly: true,
            bounds: document.body,
            scrollContainer: null
        }

        this.ngQuillStarter();
    }

    ngQuillStarter() {
        this.ngQuillConfigProvider.set(this.ngQuillConfigs);
    }
}

NgQuill.$inject = ['ngQuillConfigProvider'];