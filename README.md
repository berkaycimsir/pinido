# Pinido

> Pinido is a todo app to learn more about concepts like Vue3, Vite, Firebase, Pinia, Vue Router and Tailwind.

> Live demo [here](https://pinido.netlify.app).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Project Status](#project-status)
- [Contact](#contact)
- [Support](#show-your-support)
<!-- * [License](#license) -->

## General Information

Pinido is a todo app to learn more about concepts like Vue3, Vite, Firebase, Pinia, Vue Router and Tailwind.

I tried to use latest versions of the technologies to stay up to date with them.

## Technologies Used

- **Vue3 (with typescript)**
  - Pinia as a state manager
  - Tailwindcss as a css framework
  - Firebase to handle db, auth and image uploading.
  - Vue router to achieve route management across app
- **Firebase**
  - Firebase storage
  - Firebase firestore
  - Firebase auth (email/password authentication)

## Setup

First, clone the repository:

`git clone https://github.com/berkaycimsir/pinido.git <directory_name>`

Second, go to the project folder and install dependencies:

`yarn install`

Then, set your environment variables:

> This project uses firebase as database. You can read more about firebase from [here](https://firebase.google.com/)

```ts
// .env

VITE_FIREBASE_API_KEY =
VITE_FIREBASE_AUTH_DOMAIN =
VITE_FIREBASE_PROJECT_ID =
VITE_FIREBASE_STORAGE_BUCKET =
VITE_FIREBASE_MESSAGING_SENDER_ID =
VITE_FIREBASE_APP_ID =
```

Finally, you can start the project by running:

`yarn dev`

## Project Status

Project is: _completed_

## Contact

Created by [@berkaycimsir](https://www.github.com/berkaycimsir) - feel free to contact me!

👤 **Berkay Çimşir**

- Website: [personal blog](https://berkaycimsir-personal-blog.deno.dev/)
- Twitter: [@berkaycimsir](https://twitter.com/berkaycimsir)
- Github: [@berkaycimsir](https://github.com/berkaycimsir)

## Show your support

Give a ⭐️ if this project helped you!
