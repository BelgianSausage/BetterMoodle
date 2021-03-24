-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2021 at 06:04 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bettermoodle`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `CommentID` int(11) NOT NULL,
  `Author` int(11) NOT NULL,
  `Body` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `EventID` int(11) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `Date` varchar(32) NOT NULL,
  `Start` varchar(32) NOT NULL,
  `End` varchar(32) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `flag`
--

CREATE TABLE `flag` (
  `FlagID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `NoteID` int(11) NOT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `flag`
--

INSERT INTO `flag` (`FlagID`, `UserID`, `NoteID`, `Comment`) VALUES
(9, 1, 6, 'Test note 4 flag'),
(10, 1, 9, 'doesn\'t provide any userful information');

-- --------------------------------------------------------

--
-- Table structure for table `institution`
--

CREATE TABLE `institution` (
  `InstitutionID` int(11) NOT NULL,
  `Name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `institution`
--

INSERT INTO `institution` (`InstitutionID`, `Name`) VALUES
(0, 'Bath');

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `LessonID` int(11) NOT NULL,
  `ModuleID` int(11) NOT NULL,
  `Slug` varchar(128) NOT NULL,
  `Author` int(11) NOT NULL,
  `Title` varchar(32) NOT NULL,
  `Description` varchar(128) NOT NULL,
  `Body` text NOT NULL,
  `CreatedAt` date NOT NULL,
  `Published` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`LessonID`, `ModuleID`, `Slug`, `Author`, `Title`, `Description`, `Body`, `CreatedAt`, `Published`) VALUES
(0, 0, 'persuasive-technologies-and-behaviour-change', 0, 'Persuasive Technologies and Beha', 'HCI lecture', 'This is the body', '2021-03-24', '2021-03-24'),
(1, 0, 'hci-loil', 0, 'HCI LOIL', 'live online interactive session for HCI', 'this is the body', '2021-03-24', '2021-03-24');

-- --------------------------------------------------------

--
-- Table structure for table `module`
--

CREATE TABLE `module` (
  `ModuleID` int(11) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Slug` varchar(128) NOT NULL,
  `Description` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `module`
--

INSERT INTO `module` (`ModuleID`, `Name`, `Slug`, `Description`) VALUES
(0, 'Human Computer Interaction', 'human-computer-interaction', 'Edited description 3'),
(1, 'Databases', 'databases', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend venenatis nisi gravida consequat. Donec eleifend ipsum mi'),
(2, 'Fundamentals of Machine Learning', 'fundamentals-of-machine-learning', 'This course teaches the background needed for computer graphics, computer vision, computer music.\r\n\r\nThe course has the followin'),
(3, 'Foundations of Computation', 'foundations-of-computation', 'This unit introduces formal models of computation: finite automata, pushdown automata, Turing machines, and the corresponding cl'),
(4, 'Fundamentals of Visual Computing', 'fundamentals-of-visual-computing', 'This is an introductory course that teaches the essential mathematical and computational foundations for Computer Graphics and C'),
(5, 'Artificial Intelligence', 'artificial-intelligence', 'Introduction to artificial intelligence'),
(6, 'Comparative Programming Language', 'comparative-programming-languages', 'There are very many different styles of programming language, and very many different ways programming languages provide support'),
(7, 'Data Structures and Algorithms', 'data-structures-and-algorithms', 'My name is Christof and I will be your lecturer during this unit. I love teaching Data Structures & Algorithms as it is at the c'),
(8, 'Functional Programming', 'functional-programming', 'This unit is an introduction to functional programming. It covers the basic notions and techniques, using the programming langua'),
(9, 'Integrated Group-based Project', 'integrated-group-based-project', 'The Integrated Project presents you with an opportunity to bring together the skills you have gained in the first year and the n');

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `NoteID` int(11) NOT NULL,
  `Title` varchar(32) NOT NULL,
  `Slug` varchar(128) NOT NULL,
  `Description` varchar(128) NOT NULL,
  `Body` text NOT NULL,
  `ModuleID` int(11) NOT NULL,
  `IsPublic` tinyint(1) NOT NULL,
  `CreatedAt` date NOT NULL,
  `Published` date NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`NoteID`, `Title`, `Slug`, `Description`, `Body`, `ModuleID`, `IsPublic`, `CreatedAt`, `Published`, `UserID`) VALUES
(3, 'Example note 3', 'example-note-3', 'a', 'axcdfdfdd', 0, 0, '2021-03-12', '2021-03-12', 1),
(4, 'Example note 2', 'example-note-2', 'dsdsdss', 'sdsdss', 0, 0, '2021-03-16', '2021-03-16', 1),
(5, 'Heuristic evaluation', 'heuristic-evaluation', '10 Heuristics for HCI', 'blah blah blah', 0, 1, '2021-03-21', '2021-03-21', 1),
(6, 'Note 4', 'note-4', 'Test', 'test', 0, 0, '2021-03-21', '2021-03-21', 1),
(7, 'Databases', 'databases', 'test', 'test', 0, 0, '2021-03-21', '2021-03-21', 2),
(8, 'Hello', 'hello', 'Hello', 'Hello', 0, 1, '2021-03-24', '2021-03-24', 2),
(9, 'hello 2', 'hello-2', 'hello 2', 'hello 2', 0, 0, '2021-03-24', '2021-03-24', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(16) NOT NULL,
  `FName` varchar(16) NOT NULL,
  `LName` varchar(16) NOT NULL,
  `InstitutionID` int(11) NOT NULL,
  `Privilege` int(11) NOT NULL,
  `Hash` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `UserName`, `FName`, `LName`, `InstitutionID`, `Privilege`, `Hash`) VALUES
(1, 'a', 'a', 'a', 0, 0, '$2b$12$GoSfWzTUGAtzQImt1h2ZcuaQlB8vI5FaKPwWAImOX9ilvUh4sPAwy'),
(2, 'test', 'test', 'test', 0, 0, '$2b$12$yqpE5SCJ9PvKZwKLJfNkaeNHqzJZJKBHdaNpHVcCYAPM22pV4B7Hi'),
(3, 'test2', 'test2', 'test2', 0, 0, '$2b$12$IzPmFyUw36m8FOzzu477g.uGR6dJJZuIiUhJmY5LG221xOGNBu3kG');

-- --------------------------------------------------------

--
-- Table structure for table `usermodule`
--

CREATE TABLE `usermodule` (
  `UserModuleID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ModuleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usermodule`
--

INSERT INTO `usermodule` (`UserModuleID`, `UserID`, `ModuleID`) VALUES
(0, 1, 0),
(1, 2, 0),
(2, 2, 1),
(3, 1, 1),
(4, 1, 2),
(5, 1, 2),
(6, 1, 3),
(7, 1, 4),
(8, 1, 5),
(9, 1, 6),
(10, 1, 7),
(11, 1, 8),
(12, 1, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`CommentID`) USING BTREE,
  ADD KEY `Author` (`Author`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`EventID`);

--
-- Indexes for table `flag`
--
ALTER TABLE `flag`
  ADD PRIMARY KEY (`FlagID`);

--
-- Indexes for table `institution`
--
ALTER TABLE `institution`
  ADD PRIMARY KEY (`InstitutionID`) USING BTREE;

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`LessonID`) USING BTREE,
  ADD KEY `ModuleID` (`ModuleID`),
  ADD KEY `Author` (`Author`);

--
-- Indexes for table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`ModuleID`) USING BTREE;

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`NoteID`) USING BTREE,
  ADD KEY `ModuleID` (`ModuleID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`) USING BTREE,
  ADD UNIQUE KEY `UserName` (`UserName`),
  ADD KEY `InstitutionID` (`InstitutionID`);

--
-- Indexes for table `usermodule`
--
ALTER TABLE `usermodule`
  ADD PRIMARY KEY (`UserModuleID`) USING BTREE,
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ModuleID` (`ModuleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `EventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `flag`
--
ALTER TABLE `flag`
  MODIFY `FlagID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `NoteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ModuleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
