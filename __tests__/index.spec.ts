import ComponentRef from './../src';
import TestComponent from './../__fixtures__/TestComponent';

describe('ComponentRef', () => {
    describe('constructor', () => {
        it('creates new ComponentRef', () => {
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            expect(componentRef instanceof ComponentRef).toBeTruthy();
        });

        it('creates new ComponentRef and stores callback to call when non null ref is obtained', () => {
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            expect(componentRef instanceof ComponentRef).toBeTruthy();
            expect(onRef).not.toBeCalled();
        });
    });

    describe('getComponent', () => {
        it('should return null when ref is not obtained', () => {
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            expect(componentRef.getComponent()).toBeNull();
        });
    });

    describe('ref', () => {
        it('sets component ref', () => {
            const component: TestComponent = new TestComponent({ type: "test", count: 9 });
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            componentRef.ref(component);
            expect(componentRef.getComponent()).toBe(component);
            expect(componentRef.getComponent().getType()).toBe("test");
            expect(componentRef.getComponent().getCount()).toBe(9);
        });

        it('should be this bound', () => {
            const component: TestComponent = new TestComponent({ });
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            const { ref } = componentRef;
            ref(component);
            expect(componentRef.getComponent()).toBe(component);
        });

        it('dose not call onRef if ref is null', () => {
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            componentRef.ref(null);
            expect(onRef).not.toBeCalled();
        });

        it('calls onRef if ref is not null', () => {
            const component: TestComponent = new TestComponent({ });
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            componentRef.ref(component);
            expect(onRef).toBeCalledWith(component);
        });

        it('gets null if component ref is garbage collected', () => {
            let component: TestComponent = new TestComponent({ });
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            componentRef.ref(component);
            expect(componentRef.getComponent()).toBe(component);
            component = null;
            componentRef.ref(component);
            expect(component).toBeNull();
            expect(componentRef.getComponent()).toBeNull();
        });
    });
});