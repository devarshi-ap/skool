## About this project

<br />

### › Stack 🔨
- TypeScript
- NextJs (+Tailwind)
- Prisma ORM
- Postgresql (+PgAdmin)
- Heroku
- Insomnia
- & extra 💛

<br />

### › API endpoints ✴︎
baseURL = **/api**

**/ students**
- **`GET`** - get all students.
- **`POST`** - create new student.

**/ students / {s_id}**
- **`GET`** - get student with s_id.
- **`PATCH`** - update student with s_id.
- **`DELETE`** - remove student with s_id.

**/ students / {s_id} / courses**
- **`GET`** - get courses of student with s_id.

**/ students / {s_id} / courses / {c_id}**
- **`PUT`** - enrol student with s_id into course with c_id.
- **`DELETE`** - drop student with s_id out of course with c_id.

**/ courses**
- **`GET`** - get all courses offered.
- **`POST`** - create (offer) a new course.

**/ courses / {c_id}**
- **`GET`** - get courses with c_id.
- **`DELETE`** - remove (no longer offer) course with c_id.

**/ profs**
- **`GET`** - get all profs.
- **`POST`** - create new prof.

<br />

### › Database Design 🗂
![School](https://user-images.githubusercontent.com/59234436/186207010-e4a0fc4e-7242-4aef-b0cd-29c65a15b34d.png)

Below you'll find the database schemas:

```sql
-- STUDENT TABLE
create table if not exists Student (
	s_id serial primary key,
	email varchar(100) unique,
	fname varchar(50),
	lname varchar(50),
	program varchar(50),
	year int check(year in (1, 2, 3, 4)),
	gpa decimal
);
```

```sql
-- COURSE TABLE
create table if not exists course (
	c_id serial primary key,
	dept varchar(50),
	code varchar(50) unique,
	title varchar(50),
	description text,
	prof varchar(50),
	units int check(units in (1, 2, 3)),
	semester varchar(10) check(semester in ('fall', 'winter', 'spring', 'summer'))
);
```

```sql
-- PROF TABLE
create table if not exists prof (
	p_id serial primary key,
	email varchar(100) unique,
	fname varchar(50),
	lname varchar(50),
	faculty varchar(50),
	tenured boolean default false
)
```

<br />

### › Challenges 🚧
- first time designing a database
- first time deploying to heroku
- trying to find a work-around of NextJs' poorly documented nested dynamic routing
- making api structure as semantic as can be,
- got in over my head trying to use Docker,

<br />

### › Learning 🌱
- Postgresql primary and foreign keys
- Connecting and deploying postgres (PgAdmin) database to heroku
- Prisma schema validation
- Building async database queries with Prisma Client
- Nested dynamic API routing (ie. /students/{id}/courses/{id} )

<br />

### › Setup ⚙️

The DB is hosted on Postgres Heroku (PaaS), so you'll need to [set that up](https://devcenter.heroku.com/articles/heroku-postgresql).

First, run the development server (includes *hot-module reloading*):

```bash
npm run dev
# or
yarn dev
```

Any changes in the prisma schema must be migrated to the postgres DB deployed on heroku using the Prisma CLI
```bash
# migrate to DB
npx prisma db push

# migrate from DB
npx prisma dp pull
```

Commit the changes from your git repo to heroku deployment using the Heroku CLI:
```bash
heroku login
git add .
git commit -am "first commit"
git push heroku main
``` 

You can edit the landing page (default error-and-all-purpose landing page) by modifying `pages/404.tsx`.

See NextJs' [Dynamic API Routing](https://nextjs.org/learn/basics/dynamic-routes) to understand the project's API structure.
