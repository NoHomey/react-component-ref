import bind from 'bind-decorator';

const funcType: string = 'function';

export type RefHandler<C> = (component: C) => void;

export class ComponentRef<C> {
    private component: C;
    private onRef: RefHandler<C>;

    public getComponent(): C {
        return this.component;
    }

    @bind
    public ref(component: C): void {
        this.component = component;
        if((component !== null) && (typeof this.onRef === funcType)) {
            this.onRef(component);
        }
    } 

    public constructor(onRef: RefHandler<C> = null) {
        this.component = null;
        this.onRef = onRef;
    }
}

export default ComponentRef;