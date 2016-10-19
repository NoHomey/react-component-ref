import bind from 'bind-decorator';

const funcType: string = 'function';

export type Nullable<T> = T | null;

export type RefHandler<C> = (component: Nullable<C>) => void;

export class ComponentRef<C> {
    private component: Nullable<C>;
    private onRef: Nullable<RefHandler<C>>;

    public getComponent(): C {
        return this.component!;
    }

    @bind
    public ref(component: Nullable<C>): void {
        this.component = component;
        if((component !== null) && (typeof this.onRef === funcType)) {
            this.onRef!(component);
        }
    } 

    public constructor(onRef: Nullable<RefHandler<C>> = null) {
        this.component = null;
        this.onRef = onRef;
    }
}

export default ComponentRef;