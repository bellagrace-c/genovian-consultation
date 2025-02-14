# React + TypeScript + Vite

The app allows users to answer a series of medical questions, tracks their answers, and prevents further edits after completion.

Steps to run:

git clone https://github.com/bellagrace-c/genovian-consultation.git

cd genovian-consultation

npm install

npm run dev

The app will be available at http://localhost:5173/ (default for Vite).


This project uses Jest and React Testing Library for unit testing, to run tests:

npm test



Assumptions:

Each question has only two possible answers: Yes or No.

Users answer questions sequentially and cannot skip questions.

Once a consultation is submitted, answers cannot be changed.

The application does not require authentication for consultation.

Users must complete all questions before submitting.

The frontend does not interact with an API or backend; answers are stored in state.


Decisions:


Vite optimizes React builds with ES modules.

Disable edit answers once submitted - mimics real life use cases.

Simple functionality to align with the task description - allowing lots of development and improvement.
