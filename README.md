# react-component-ref

Simple helper class to help you stay DRY (Don't repeat yourself)

[![Build Status](https://semaphoreci.com/api/v1/nohomey/react-component-ref/branches/master/badge.svg)](https://semaphoreci.com/nohomey/react-component-ref)

`ComponentRef` is a small helper `class` which should help you stay as much DRY as possible and encourage you to add `ref`s to your react `Components` when it's necessary (when you need it or a third party library needs access to native element). (see [Refs to Components](https://facebook.github.io/react/docs/more-about-refs.html) if you haven't already)

# Install

[![NPM](https://nodei.co/npm/react-component-ref.png?downloads=true&stars=true)](https://nodei.co/npm/react-component-ref/)

# Usage

## JavaScript

```javascript
// before

class Before extends React.Component {
  constructor(props) {
    super(props);
    this.inputName = null;
    this.inputPass = null;
    this.refName = (input) => {
      this.inputName = input;
      input.focus();
    }
    this.refInput = (input) => this.inputPass = input;
    this.onChange = (event) => this.inputName.select();
  }
  
  render() {
    return (
      <form name="login">
        <input name="name" ref={this.refName} onChange={this.onChange}/>
        <input name="pass" ref=(this.refPass} />
      <form>
    );
  }
}

// after

import ComponetRef from 'react-component-ref';

class After extends React.Component {
  constructor(props) {
    super(props);
    this.inputName = new ComponentRef((input) => input.focus());
    this.inputPass = new ComponentRef();
    this.onChange = (event) => this.inputName.getComponent().select();
  }
  
  render() {
    return (
      <form name="login">
        <input name="name" ref={this.inputName.ref} onChange={this.onChange}/>
        <input name="pass" ref=(this.inputPass.ref} />
      <form>
    );
  }
}
```

## TypeScript

```typescript
// before

class Before extends React.Component<any, any> {
  private inputName: HTMLInputElement;
  private inputPass: HTMLInputElement;
  private refName: (input: HTMLInputElement) => void;
  private refPass: (input: HTMLInputElement) => void;
  private onChange: React.FromEventHandler;
  
  public constructor(props: any) {
    super(props);
    this.inputName = null;
    this.inputPass = null;
    this.refName = (input: HTMLInputElement): void => {
      this.inputName = input;
      input.focus();
    }
    this.refInput = (input: HTMLInputElement): void => this.inputPass = input;
    this.onChange = (event: React.FormEvent) => this.inputName.select();
  }
  
  render() {
    return (
      <form name="login">
        <input name="name" ref={this.refName} onChange={this.onChange}/>
        <input name="pass" ref=(this.refPass} />
      <form>
    );
  }
}

// after

import ComponetRef from 'react-component-ref';
import bind from 'bind-decorator'; // Optional 

class After extends React.Component<any, any> {
  private inputName: ComponetRef<HTMLInputElement>;
  private inputPass: ComponetRef<HTMLInputElement>;
  
  @bind
  private onChange(event: React.FormEvent): void {
    this.inputName.getComponent().select();
  }
  
  public constructor(props: any) {
    super(props);
    this.inputName = new ComponentRef((input: HTMLInputElement) => input.focus());
    this.inputPass = new ComponentRef();
  }
  
  public render(): JSX.Element {
    return (
      <form name="login">
        <input name="name" ref={this.refName.ref} onChange={this.onChange}/>
        <input name="pass" ref=(this.refPass.ref} />
      <form>
    );
  }
}
```
