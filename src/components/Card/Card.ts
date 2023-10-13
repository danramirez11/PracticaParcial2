export enum Attribute {
    "one" = "one",
    "two" = "two",
}

class Card extends HTMLElement {

    one?: string;
    two?: number;

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    static get observedAttributes(){
        const attrs: Record <Attribute, null> = {
            one: null,
            two: null,
        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){
        switch(propName){
            case Attribute.two:
                this.two = newValue ? Number(newValue) : undefined
                break;
            default:
                this[propName] = newValue;
                break;
        }
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <div>
            <p>${this.one}</p>
            <p>${this.two}</p>
            </div>
            `
        }
    }

}


customElements.define("my-card", Card)
export default Card;