CREATE TABLE "Student" (
  "s_id" int,
  "email" varchar,
  "fname" varchar,
  "lname" varchar,
  "program" varchar,
  "year" int,
  "gpa" int
);

CREATE TABLE "Course" (
  "c_id" int,
  "name" varchar,
  "description" varchar,
  "units" int,
  "semester" varchar
);

CREATE TABLE "Prof" (
  "p_id" int,
  "fname" varchar,
  "lname" varchar,
  "email" varchar,
  "faculty" varchar,
  "tenured" boolean
);

CREATE TABLE "Stu_Cou" (
  "s_id" int,
  "c_id" int
);

CREATE TABLE "Prof_Cou" (
  "p_id" int,
  "c_id" int
);

ALTER TABLE "Stu_Cou" ADD FOREIGN KEY ("s_id") REFERENCES "Student" ("s_id");

ALTER TABLE "Stu_Cou" ADD FOREIGN KEY ("c_id") REFERENCES "Course" ("c_id");

ALTER TABLE "Prof_Cou" ADD FOREIGN KEY ("p_id") REFERENCES "Prof" ("p_id");

ALTER TABLE "Prof_Cou" ADD FOREIGN KEY ("c_id") REFERENCES "Course" ("c_id");
