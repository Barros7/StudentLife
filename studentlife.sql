CREATE TABLE Houses
(
  Id_house INT NOT NULL,
  Image VARCHAR(32) NOT NULL,
  Price FLOAT NOT NULL,
  Tipology VARCHAR(15) NOT NULL,
  PRIMARY KEY (Id_house),
  UNIQUE (Price),
  UNIQUE (Tipology)
);

CREATE TABLE Foods
(
  Id_food INT NOT NULL,
  Name CHAR(10) NOT NULL,
  Price FLOAT NOT NULL,
  Image VARCHAR(32) NOT NULL,
  PRIMARY KEY (Id_food),
  UNIQUE (Name),
  UNIQUE (Price)
);

CREATE TABLE Companies
(
  Id_Company INT NOT NULL,
  Name CHAR(10) NOT NULL,
  Image VARCHAR(32) NOT NULL,
  Additional_Prize INT NOT NULL,
  PRIMARY KEY (Id_Company),
  UNIQUE (Name),
  UNIQUE (Additional_Prize)
);

CREATE TABLE Courses
(
  Id_Course INT NOT NULL,
  Name INT NOT NULL,
  PRIMARY KEY (Id_Course),
  UNIQUE (Name)
);

CREATE TABLE Subject
(
  Id_Subject INT NOT NULL,
  Name INT NOT NULL,
  PRIMARY KEY (Id_Subject),
  UNIQUE (Name)
);

CREATE TABLE Social_Status
(
  Id_Status INT NOT NULL,
  Status INT NOT NULL,
  PRIMARY KEY (Id_Status),
  UNIQUE (Status)
);

CREATE TABLE Courses_Subjects
(
  Id_Course INT NOT NULL,
  Id_Subject INT NOT NULL,
  PRIMARY KEY (Id_Course, Id_Subject),
  FOREIGN KEY (Id_Course) REFERENCES Courses(Id_Course),
  FOREIGN KEY (Id_Subject) REFERENCES Subject(Id_Subject)
);

CREATE TABLE Questions
(
  Id_Question INT NOT NULL,
  Question VARCHAR(50) NOT NULL,
  Answer VARCHAR(50) NOT NULL,
  Academic_Level INT NOT NULL,
  Id_Course INT NOT NULL,
  Id_Subject INT NOT NULL,
  PRIMARY KEY (Id_Question),
  FOREIGN KEY (Id_Course, Id_Subject) REFERENCES Courses_Subjects(Id_Course, Id_Subject),
  UNIQUE (Question)
);

CREATE TABLE Wrong_Answers
(
  Id_Answers INT NOT NULL,
  Wrong_Answer VARCHAR(50) NOT NULL,
  Id_Question INT NOT NULL,
  PRIMARY KEY (Id_Answers),
  FOREIGN KEY (Id_Question) REFERENCES Questions(Id_Question),
  UNIQUE (Wrong_Answer)
);

CREATE TABLE Students
(
  Id_Student INT NOT NULL,
  Academic_Level INT NOT NULL,
  Age INT NOT NULL,
  Email VARCHAR(32) NOT NULL,
  Emotion INT NOT NULL,
  Name VARCHAR(10) NOT NULL,
  Life INT NOT NULL,
  Money FLOAT NOT NULL,
  Password VARCHAR(32) NOT NULL,
  Salary INT NOT NULL,
  Image VARCHAR(32) NOT NULL,
  Username VARCHAR(15) NOT NULL,
  Id_House INT NOT NULL,
  Id_Company INT NOT NULL,
  Id_Course INT NOT NULL,
  Id_Status INT NOT NULL,
  PRIMARY KEY (Id_Student),
  FOREIGN KEY (Id_House) REFERENCES Houses(Id_house),
  FOREIGN KEY (Id_Company) REFERENCES Companies(Id_Company),
  FOREIGN KEY (Id_Course) REFERENCES Courses(Id_Course),
  FOREIGN KEY (Id_Status) REFERENCES Social_Status(Id_Status),
  UNIQUE (Username),
  UNIQUE (Email)
);

CREATE TABLE Tests
(
  Id_Test INT NOT NULL,
  Time INT NOT NULL,
  Mark INT NOT NULL,
  Test_Number INT NOT NULL,
  Id_Subject INT NOT NULL,
  Id_Student INT NOT NULL,
  PRIMARY KEY (Id_Test),
  FOREIGN KEY (Id_Subject) REFERENCES Subject(Id_Subject),
  FOREIGN KEY (Id_Student) REFERENCES Students(Id_Student)
);

CREATE TABLE Buy_Food
(
  Id_Student INT NOT NULL,
  Id_Food INT NOT NULL,
  PRIMARY KEY (Id_Student, Id_Food),
  FOREIGN KEY (Id_Student) REFERENCES Students(Id_Student),
  FOREIGN KEY (Id_Food) REFERENCES Foods(Id_food)
);

SELECT S.Username, F.Foods, FROM Students AS S
INNER JOIN Buy_Food AS F ON (F.Id_Food = S.Id_Student)
WHERE S.Id_Student = <Id_Student>

SELECT * From Houses
JOIN Students
ON Houses.Id_House = Students.Id_Student