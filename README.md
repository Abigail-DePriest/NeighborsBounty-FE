## NeighborsBounty-BE
Neighbor’s Bounty is an application designed to streamline the organization of mutual aid food projects. It helps users track donations, manage meal preparation, and coordinate distribution efforts. The app aims to simplify the process of serving fresh, nutritious food to community members in need, while also expanding its functionality to meet broader needs.

## Problem Statement
One of the biggest challenges with sustaining mutual aid efforts is effective planning and organization. When it comes to serving food, there are several phases to consider and time is of the essence.

## Features

- Create and manage events, managing them by type.

- User can sign-up for events and specific roles from available options. The system records these       sign-ups to manage participation and responsibility delegation.

- Inventory management: track donations for the week. Inventory is associated with weekly Gleaning and Cooking    events and changes weekly.
___

## Wireframe

https://www.figma.com/board/ogsZtb2HnuLzodjqKXnJGQ/Neighbor's-Bounty?node-id=0-1&t=BdUBajC4cJpqygMH-1

## Loom video

https://www.loom.com/share/96349b895c984446b77112abca3f68e1?sid=d050d7ab-9a11-4a30-aa2c-5c9d234d2a1f

## Tech Stack
- **Next.js**
- **React**
- **Node.js**
- **Firebase**
- **Bootstrap**



## Getting Started
### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="915" alt="Screen Shot 2022-07-06 at 12 54 01 PM" src="https://user-images.githubusercontent.com/29741570/177612998-4aac9237-5a1e-4f13-8ae0-468587521564.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="763" alt="Screen Shot 2022-07-06 at 12 54 48 PM" src="https://user-images.githubusercontent.com/29741570/177613126-dd38f678-7553-4f27-8a4a-75680f14d71e.png">

#### 3. Clone your new repo to your local machine
#### 4. Go to the **NEXT** section

## Starting the Project
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
