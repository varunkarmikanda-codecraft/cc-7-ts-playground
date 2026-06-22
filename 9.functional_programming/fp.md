---
marp: true
theme: default
paginate: true
---

## Pure Functions

All the above are **Pure functions**. They solely depend on the _arguments_ to compute the return value.

### Key things they avoid

- No reading or modifying global variables
- No printing to console
- No mutating input arguments
- No network calls, file I/O, or random number generation
- No exceptions thrown

🚀 Pure functions have no side effects and are easy to test.

---

## Impure functions

**Impure functions** are functions that cause _side effects_—any change in system state observable outside the called function.

### Key things they do

- Modifying global variables or external state
- Performing I/O operations (files, network, console logging)
- Mutating input arguments
- Relying on external factors like time or randomness

⚡ Impure functions are harder to test and reason about.

---

## Functions are first class citizens in JS

In **JavaScript** and **TypeScript**, functions are _first-class citizens_. This means they can be treated like any other value.

You can:

1. Assign them to variables
2. Pass them as arguments to other functions
3. Return them from other functions

---

## Higher Order functions

A function that takes one or more functions as its arguments and/or returns a function as its return value is known as a **Higher-Order function**.

Examples: `forEachElement`, `createGreeter`.

---

## Closure mechanism

A **closure** is the combination of a function bundled together with references to its surrounding state (the _lexical environment_).

Closures give inner functions access to outer scopes, and they are created every time a function is defined.

---

## Currying and partial application

Currying transforms a multi-argument function into a sequence of single-argument functions whose innermost function uses the closed-over parameters.

It enables partial application, letting us create reusable point-free functions such as `add5` or `add5and10` that remember their captured context.

---

## Imperative and Declarative styles of programming

### transforming items in an array

> Imperative implementations focus more on _how_ to do things than on _what_ to do.

Can we do better?

### map function · filtering an array · filter function · accumulating values · reduce or fold function

These headings introduce the declarative helpers (`map`, `filter`, `reduce`) showcased in the notebook code examples.

---

## Conclusion

### ✨ In a nutshell

- From **impure** ➝ **pure** functions
- Eliminating **side effects**
- Moving from **mutating state** ➝ **immutable copies** of state
- Invent partially applied functions via currying when needed
- Shift from **imperative** (“_how_”) ➝ **declarative** (“_what_”) style
- Abstract **business-agnostic reusable HOFs** (`map`, `filter`, `reduce`)

The topics covered are foundational concepts of **Functional Programming**. Thanks to JavaScript's first-class functions and closure support, there's much more to explore—compose/pipe, functors, applicatives, monads, and beyond.
