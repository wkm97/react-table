# React Table

Table that fetch [public repositories data](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-public-repositories) from https://api.github.com/repositories with pagination. Search feature based on specific field is also provided.

# TODO

- search feature and a pagination feature
- written using typescript and styled components
- written using modern best practices and features of the ReactJS framework
- styled ease-of-use in mind and attention to detail
- unit tested using a framework such as jest

# Q&A

## Write a brief summary of what the React lifecycle is and how it works.

React lifecycle mainly consists of 3 stage which is **mounting, update, and unmounting**, lifecycle methods is provided as hooks to allow us to give instructions to component about what to do in each lifecycle. When the component first rendered to the screen, the `componentDidMount` will be called for execution. Where as if there is a change to state of the component, the `componentDidUpdate` will be called for execution. `componentWillUnmount` is called when the component is destroyed. The following show the purpose or use case for each stage:

- componentDidMount, fetch data from an API or set up any subscriptions
- componentDidUpdate, perform some side effects after the state of component channges
- componentWillUnmount, perform cleanup of resource or subscriptions setup during mounting stage

## Write a brief summary of what Redux is and how it might be integrated into an app.

Redux is a library that help us to manage and centralise the application state. The workflow to update the state in redux store is by triggering an `action` by using `dispatch` function. The `action` which describe what happened will be received by `reducer` which is a function that execute logic instructed to create a new state based on the current state and `action`. Thus, the redux store is updated.

Based on the docs, the suggested way to integrated into an app is through `@reduxjs/toolkit`.

## Write a brief summary of what unit testing or smoke testing is and why it's useful.

Unit testing is a testing for individual units/functions/classes of code to ensure that the logic is work as expected. There shouldn't be any external interaction for unit test and we could mock the external interaction and assume it is there. It is useful to ensure that we don't break things and iterate faster thoughout the development process and it is also a form of documentation for usage guide.

# Reference

- https://github.com/erictooth/react-use-pagination
- https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
- https://josemukorivo.com/blog/create-a-reusable-table-with-react-styled-components-and-compound-components-design-pattern-40cn
- https://dev.to/dcodeyt/creating-beautiful-html-tables-with-css-428l
