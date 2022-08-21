-- CREATE STUDENT TABLE
create table if not exists Student (
	s_id serial primary key,
	email varchar(100) unique,
	fname varchar(50),
	lname varchar(50),
	program varchar(50),
	year int check(year in (1, 2, 3, 4)),
	gpa decimal
);

-- CREATE COURSE TABLE
create table if not exists course (
	c_id serial primary key,
	dept varchar(50),
	code varchar(50),
	title varchar(50),
	description text,
	prof varchar(50),
	units int check(units in (1, 2, 3)),
	semester varchar(10) check(semester in ('fall', 'winter', 'spring', 'summer'))
);

-- CREATE PROF TABLE
create table if not exists prof (
	p_id serial primary key,
	email varchar(100) unique,
	fname varchar(50),
	lname varchar(50),
	faculty varchar(50),
	tenured boolean default false
)

-- POPULATE STUDENT TABLE
insert into student (email, fname, lname, program, year, gpa)
values
	('john.doe@ryerson.ca', 'John', 'Doe', 'Computer Science', 1, 4.05),
	('frank.ocean@ryerson.ca', 'Frank', 'Ocean', 'Architecture', 3, 3.57),
	('bruce.wayne@ryerson.ca', 'Bruce', 'Wayne', 'Medical Physics', 4, 4.33);
	

-- POPULATE COURSE TABLE
insert into course (dept, code, title, description, prof, units, semester)
values
	('Computer Science', 'CPS', 'CPS530', 'Web Systems Development', 'Dr. X', 1, 'fall'),
	('Architecture', 'ASC', 'ASC303', 'Structures II', 'Dr. Y', 1, 'winter'),
	('Physics', 'PCS', 'PCS405', 'Medical Imaging', 'Dr. Z', 1, 'winter');

-- POPULATE PROF TABLE
insert into prof (email, fname, lname, faculty, tenured)
values
	('prof.x@ryerson.ca', 'Prof', 'X', 'Science', false),
	('prof.y@ryerson.ca', 'Prof', 'Y', 'Architectural Science', true),
	('prof.z@ryerson.ca', 'Prof', 'Z', 'Science', true);

-- CREATE STUDENT-COURSE RELATIONAL TABLE (ONLY FOREIGN KEYS)
create table if not exists stu_cou (
	student_id bigint,
	course_id bigint,
	foreign key (student_id) references student(s_id),
	foreign key (course_id) references course(c_id)
);

-- CREATE PROF-COURSE RELATIONAL TABLE (ONLY FOREIGN KEYS)
create table if not exists prof_cou (
	prof_id bigint,
	course_id bigint,
	foreign key (prof_id) references prof(p_id),
	foreign key (course_id) references course(c_id)
);

-- POPULATE STUDENT-COURSE TABLE 
insert into stu_cou (student_id, course_id)
values
	(1, 1),
	(2, 2),
	(3, 3);

-- POPULATE PROF-COURSE TABLE
insert into prof_cou (prof_id, course_id)
values
	(1, 1),
	(2, 2),
	(3, 3);

-- IDK TBH
select student.email, student.program, course.code
from student, course, stu_cou
where stu_cou.student_id = student.s_id
	and stu_cou.course_id = course.c_id;

-- IDK TBH pt.2
select prof.email, prof.faculty, course.code
from prof, course, prof_cou
where prof_cou.prof_id = prof.p_id
	and prof_cou.course_id = course.c_id;