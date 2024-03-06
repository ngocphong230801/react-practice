# REACT PRACTICE ONE

## Overview:

- Introduce: Build a School Management Web Application with Reactjs and TypeScript.
- Plan: [Plan practice-one](https://docs.google.com/document/d/1KGUcfnYYeZFbLqICTLxquW1L_2SFBHJx97Ra4H7W5L0/edit).
## Targets:

- Apply React basic knowledge.
- Apply React Hooks.
- Check and avoid unnecessary re-render.
- Can deploy web.

## Requirement

- Users can see the Dashboard page.
- Users can direct the Students page when clicking on “Students/classes” at the Sidebar.
- Users can see the student list. 
- Users can see an empty page if it has empty students.
- Users can see student information when clicking on the student row.
- Users can search students by name or email.
- Users can add new students.


## Features:

- Render UI
- Call API
- Show list students
- Add new student
- Show empty page
- Form validation

## Design on figma:

[Figma](<https://www.figma.com/file/xbpLfqHwFvYqDuqvbZTWNP/School-Management-Admin-Dashboard-UI-(Community)?type=design&node-id=6-3&mode=design&t=M52fndy5HBQVOW56-0>)

## Deploy:

- App: [Here](https://react-practice-olive.vercel.app/)
- Storybook: [Here](https://practice-react-sepia.vercel.app/?path=/story/components-footer--default)

## Information:

- Time line: 6 working days.
- Editor: Visual Studio Code
- Supported browser: Chrome lasted

## Environments:

- Node: v18.16.0
- Vite: Vite requires Node.js version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

## Folder structure

practice-one

```
|-- src
    |-- assets
        |-- font
        |-- icon
        |-- image
    |-- components
        |-- common
            |-- Button
            |-- Header
            |-- Input
            |-- Icon
            |-- Sizebar
        |-- ListStudent
            |-- Student
        |-- Infomation
        |-- Form
        |-- DropDown
        |-- SearchBox
    |-- constants
        |-- dropdownData
        |-- sidebar
        |-- validateFormegex
    |-- helper
        |-- uploadImage
    |-- pages
        |-- Student
        |-- Dashboard
    |-- routers
        |-- index
    |-- service
        |-- api.ts
    |-- types
        |-- header
        |-- heading
        |-- index
        |-- studentProfile
        |-- variant
    |-- App.tsx
    |-- main.tsx
    |-- index.css
    |-- App.css
|-- .eslintrc.cjs
|-- .gitignore
|-- index.html
|-- package-lock.json
|-- package.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- README.md
|-- vite.config.ts
```

## Getting started:

- Step 01: Clone repository with HTTPS:

```
git clone https://github.com/ngocphong230801/reactjs-training.git
```

- Step 02: Change to branch feature/practice-one:

```
git checkout feature/practice-one
```

- Step 03: Move to practice-one/src folder which just cloned in your computer:

```
cd practice-one/src
```

- Step 04: Install packages:

```
pnpm install
```

- Step 05: Finally run with:

```
pnpm dev
```

- Step 06: Open browser:

```
Open http://localhost:5173/ in browser.
```
