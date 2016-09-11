# react-component-ref

Simple helper class to help you stay DRY (Don't repeat yourself)

[![npm version](https://badge.fury.io/js/react-component-ref.svg)](https://badge.fury.io/js/react-component-ref)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/NoHomey/react-component-ref)
[![Build Status](https://semaphoreci.com/api/v1/nohomey/react-component-ref/branches/master/badge.svg)](https://semaphoreci.com/nohomey/react-component-ref)
[![Code Climate](https://codeclimate.com/github/NoHomey/react-component-ref/badges/gpa.svg)](https://codeclimate.com/github/NoHomey/react-component-ref)
[![Test Coverage](https://codeclimate.com/github/NoHomey/react-component-ref/badges/coverage.svg)](https://codeclimate.com/github/NoHomey/react-component-ref/coverage)
[![Issue Count](https://codeclimate.com/github/NoHomey/react-component-ref/badges/issue_count.svg)](https://codeclimate.com/github/NoHomey/react-component-ref)

`ComponentRef` is a small helper `class` which should help you stay as much DRY as possible and encourage you to add `ref`s to your react `Components` when it's necessary (when you need it or a third party library needs access to native element). (see [Refs to Components](https://facebook.github.io/react/docs/more-about-refs.html) if you haven't already)

# Install

[![NPM](https://nodei.co/npm/react-component-ref.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-component-ref)

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
    this.onChange = (event: React.FormEvent): void => this.inputName.select();
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
# Testing

1. `npm install`

2. `npm run typings`

3. `npm test`

# Contributing

1. `npm install`

2. `npm run typings`

3. Make changes

4. If necessary add some tests to `__tests__`

5. `npm test`

6. Make a Pull Request
