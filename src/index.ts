import bind from 'bind-decorator';

export class ComponentRef<C> {
    private component: C;

    public getComponent(): C {
        return this.component;
    }

    @bind
    public ref(component: C): void {
        this.component = component;
    } 

    public constructor() {
        this.component = null;
    }
}

export default ComponentRef;
