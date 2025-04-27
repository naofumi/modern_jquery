# Modern jQuery

## Introduction

Having looked at a number of projects that use jQuery,
I have noticed that each of them has evolved an approach to make the code more manageable.

Although jQuery is frequently disliked,
it seems that the developers who have actually used it have found ways to handle the criticisms that it has received. 

Here I have created a demo application which contains some of the good patterns I have seen.
I think
it would be a good idea to collect jQuery best practices
and to suggest a basic structure that would avoid jQuery annoyances.

## About the demo application

Although many jQuery applications do DOM manipulation,
I have strived to create a demo that contains some relatively complex state management and business logic.
My intention is to focus on the areas where jQuery is considered weak.

The demo is a price calculator for train tickets 
and responds to 3 different state changes and updates the DOM accordingly in 5 locations, after calculating the total fare.

## Video

[See the video](/documents/modern-jquery.mov)

<video controls>
  <source src="./documents/modern-jquery.mov" type="video/mp4">
</video>

## Points to note

Although not specific to jQuery, these are some of the patterns that I have noticed in good jQuery code.
I have added comments to the code to explain.

- **TypeScript:** You can use TypeScript with jQuery any enjoy code-completion, type warnings and easy access to documentation.
- **Vite:** jQuery itself is compatible with modern JavaScript bundlers. You can even use Vite, which gives you an auto-refreshing development server. Unfortunately, some jQuery related libraries may not be compatible.
- **ES modules:** You can easily split up your code and prevent pollution of the global namespace using ES modules. This makes it easy to organize and reuse your code. You do not need the ugly [IIFE (Immediately Invoked Function Expression) idiom](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) because ES modules will give you the same benefits. 
- **Behavior hooks:** Traditionally, CSS classes or HTML IDs were often used as behavior hooks – the HTML attributes used to connect JavaScript to the DOM. This often makes it difficult to understand how the JavaScript is hooked up. The use of dedicated `data-*` attributes can significantly improve readability.
- **Scope:** Good jQuery code clearly limits its scope. Good jQuery code often connects to a DOM element that defines its boundaries, and only operates inside it. This makes it easy to understand the blast radius of any changes.
- **Structure:** Good jQuery code defines (and caches) all its dependencies at the beginning of the main function. The dependencies are typically the queries for the HTML elements that it attaches to. This makes it very easy to understand what HTML elements trigger the events and are updated by them.
- **State:** Although there is no formal way to store state in jQuery functions, you can use closures and exploit the variables defined in the main function as state.
- **Separation of logic from presentation:** You can use plain classes as models to separate business logic from your jQuery functions.
