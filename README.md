# Trello clone

## A live version

You can [see a live version of the project running here](https://trello-clone-adrian-osmond.netlify.app/)
## Running the project

You can install the project by running 
- `npm i`
- `npm start`

from inside the project directory. Once it has finished building, you'll be able to see it at [http://localhost:3000](http://localhost:3000) in your browser.

## How to use
- You can add columns by entering the name into the text box at the bottom of the app and either hitting enter or clicking the "Add column" button
- You can add items to a column by entering the name into the text box at the bottom of the column and either hitting enter or clicking the "Add item" button
- You can rename both columns and items by clicking their name
- You can select both columns and items by clicking on them. The selected column/item will change colour to show that it is selected. Clicking outside of the column/item will unselect it.
- When a column/item is selected, it can be moved by using the arrow keys on the keyboard.

## The future
Here are some things I would've considered doing, given more time or if this was a real project

### Development
- If this were a proper project using localStorage probably wouldn't cut it. It would probably need user management and an API. As it grew the simple state management I currently have would probably not be enough. Using something like Redux might be required
- Working with a real designer I could've identified things that were good candidates to be variables and components. Currently colours like `#333` and sizes like `0.5rem` are littered throughout the codebase.
- Performance testing. I think the app loads fast enough as it is now, but after adding a bunch of other features it'd be good to reassess and see if we need to do anything about it.
- Unit and integration tests, obviously
- Proper manual testing, on multiple devices and browsers.
- Accessibility. Support for keyboard users wouldn't take too much more work, but support for screen readers would but quite a lot of effort I suspect.

### UX
- The project's UX would clearly benefit from the addition of drag and drop to the UI. I didn't think that it would be feasible to include it in the allotted 4 hours without using some existing React components (I've used [React DnD](https://github.com/react-dnd/react-dnd) for this in the past). 
- The UX would also benefit from some animations when moving items around the columns ([react-flip-toolkit](https://github.com/aholachek/react-flip-toolkit) does this nicely)
- The user shouldn't be able to perform destructive actions (delete a card or item) without confirming that they want to do this first
- Proper responsive design is needed - relying on the keyboard for controls clearly isn't touch screen friendly



## More info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
