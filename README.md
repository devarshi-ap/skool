## About this project

#### › Stack
- TypeScript
- NextJs (+Tailwind)
- Prisma ORM
- Postgresql (+PgAdmin)
- Heroku
- Insomnia

#### › API endpoints


#### › Database Design
Schema codeblocks, dbdesign screenshot

#### › Challenges
first time designing a database, first time deploying to heroku, trying to find a work-around NextJs' poorly documented nested dynamic routing, trying to make api structure as semantic as possible, got in over my head trying to use Docker, 

#### › Learning
- Postgresql primary and foreign keys
- Connecting and deploying postgres (PgAdmin) database to heroku
- Prisma schema validation
- Nested dynamic API routing (ie. /students/{id}/courses/{id} )
- 

#### › Architecture

#### › Setup

The DB is hosted on Postgres Heroku (PaaS), so you'll need to [set that up](https://devcenter.heroku.com/articles/heroku-postgresql).

First, run the development server (includes *hot-module reloading*):

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You edit the landing page (default error-and-all-purpose landing page) by modifying `pages/404.tsx`.

In essence, the `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages. See NextJs' [Dynamic API Routing](https://nextjs.org/learn/basics/dynamic-routes) to understand the project's API structure.
