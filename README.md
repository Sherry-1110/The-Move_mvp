# The Move - Northwestern University Social App

A mobile-first web app for Northwestern University students to find spontaneous hangouts happening right now.

## Features

- **Top Navigation Tabs**: Explore, Saved, My Moves tabs positioned at the top of the screen
- **Advanced Filtering**: Search by title/location, sort by newest/popular, filter by status (Live Now/Upcoming/Past) or category (Sports/Study/Social/Food)
- **Category Icons**: Visual icons on the left side of each card representing the activity type
- **Interactive Join/Unjoin**: Join moves to reveal exact meeting spots, unjoin to decrease participant count
- **Save Functionality**: Heart icon to bookmark moves you're interested in
- **Comments System**: Chat-like discussion sections for joined moves
- **Status Indicators**: Color-coded status badges (Live Now = green, Upcoming = blue, Past = gray)
- **Create Moves**: Floating + button to post new hangouts with category selection

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS 4 for styling
- Lucide React for icons
- Vitest for testing

## Getting Started

```bash
npm install
npm run dev
```

## App Structure

- `/src/components`: React components
- `/src/types`: TypeScript type definitions
- `/src/utilities`: Mock data and utilities

## Key Components

- `App.tsx`: Main application with state management for moves, search, sorting, filtering, tabs
- `MoveCard.tsx`: Displays moves with category icons, join/save functionality, and comments
- `CommentSection.tsx`: Chat interface for discussions within joined moves
- `FilterDropdown.tsx`: Advanced filtering by status and category
- `SortDropdown.tsx`: Sorting options (Newest, Popular)
- `SearchBar.tsx`: Real-time search functionality
- `CreateMoveForm.tsx`: Modal form for creating new moves with category selection

There is no code to test. This is a shell for writing an app vision for CoPilot to fill in.

## Scripts

**package.json** defines the following scripts:

| Script           | Description                                         |
| -----------------| --------------------------------------------------- |
| npm run dev      | Runs the app in the development mode.               |
| npm run build    | Builds the app for production to the `dist` folder. |
| npm run serve    | Serves the production build from the `dist` folder. |
| npm test         | Starts a Jest-like test loop                        |
| npm run coverage | Runs the tests, displays code coverage results      |


## Git

If everything is working, set up [your local and remote repositories](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github#adding-a-local-repository-to-github-using-git).

## Folder Structure

```
your-app-name
|-- .github
|   └── copilot-instructions.md
|-- docs
|   └── app-vision.md
├── public
│   └── robots.txt
│   ├── vite.svg
└── src
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.son
├── tsconfig.node.json
├── vite.config.ts
```

## Credits

Built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).


## License

This project is licensed under the terms of the [MIT license](./LICENSE).
