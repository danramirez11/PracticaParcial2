import "./screens/dashboard"
import "./components/export"


export default class AppContainer extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <my-dashboard></my-dashboard>
            `
        }
    }

}

customElements.define("app-container", AppContainer)