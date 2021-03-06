import * as React from 'react';
import { Nullable } from './../src';

export interface TestProps {
    type?: string;
    count?: number;
}

export class TestComponent extends React.Component<TestProps, void> {
    public constructor(props: TestProps) {
        super(props);
    }

    public getType(): string {
        return this.props.type!;
    }

    public getCount(): number {
        return this.props.count!;
    }

    public render(): Nullable<JSX.Element> {
        return null;
    }
}

export default TestComponent;