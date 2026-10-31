# TVmaze Gallery Show

A searchable TV show gallery made with React, Vite, and React Router. It uses the [TVmaze API] and shows up to 10 results with details about each show.

## How to Run

- Go in a Terminal
1. cd tvmaze-react
2. npm install
3. npm run dev

## React Concepts

1. Components and Props: `src/*.jsx` - Theres a component per .jsx file

2. List and Keys: `src/ShowList.jsx`

3. Conditional Rendering: `src/GalleryPage.jsx`, `src/CastList.jsx`, `src/ShowDetail.jsx`

4. Controlled Form: `src/SearchFrom.jsx`

5. State: `src/App.jsx`, `src/SearchFrom.jsx`

6. Effects and fetch: `src/App.jsx`, `src/ShowCard.jsx`, `src/ShowDetail.jsx`, `src/utils.js`, 

7. Lifted State: lived in `src/App.jsx` and `src/SearchForm.jsx` - owns the input and `src/ResultsSummary.jsx` shows the count and term

8. Routing: `src/main.jsx`(BrowserRouter), `src/App.jsx`(Routes), `src/ShowCard.jsx` (Link), `src/ShowDetail.jsx` (useParams)

## Use of AI

I only used an AI tool to help me with any debugging I wasn't familiar with and small typos across the plethora of files. I reviewed and fixed the code myself. 

I used React [https://react.dev/] and React documentation [https://reactrouter.com/]  coupled with class notes to help get a better understanding of the syntax and techniques used for this framework.

## Reflection

Rebuilding the TVmaze gallery in React made the code easier to organize, but harder to start with. I tried my best to not lose myself between the components. In vanilla javascript I built every card with createElement(), and cleared the gallery with replaceChildren(); while in React I made the template for each card with jsx and updated the page when the state changes. Most of the UI elements in the vanilla js version were made in the index.html file which wasn't touched once in the React version. I started to get the hang of assigning and splitting each UI component like ShowCard and CastList to increase usability and readability. There were definitely some challenges understanding routing inside the React framework. Ignore took some time to understand and I was left with debugging stuck pages and misuse of params. 

State lives in App.jsx (the searchTerm, results, and request status). I lifted it there so SearchForm, ResultsSummary, and the gallery share it. This makes it so going back from a detail page doesn’t trigger a new search. 
