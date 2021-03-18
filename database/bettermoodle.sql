-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2021 at 04:07 PM
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

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`EventID`, `Title`, `Date`, `Start`, `End`, `UserID`, `Description`) VALUES
(1, 'Example event 1', '2021-03-24', '19:22', '19:24', 0, 'New description.'),
(2, 'Example event 2', '2021-03-18', '15:15', '15:16', 0, 'Example event 2.'),
(3, 'Example event 3', '2021-03-26', '16:50', '17:50', 0, ''),
(4, 'Example event 4', '2021-03-18', '15:18', '15:18', 0, ''),
(5, 'Example event 5', '2021-03-18', '16:20', '17:23', 0, ''),
(6, 'Example event 9', '2021-03-24', '13:41', '16:38', 0, '0'),
(8, 'Example event 12', '2021-03-17', '15:42', '17:44', 0, '0'),
(9, 'Example event 10', '2021-03-17', '18:00', '20:00', 0, '');

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
(905, 'Human Computer Interaction', 'human-computer-interaction', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae lacus tortor. Curabitur eu metus sapien. Etiam quis diam fe');

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
(3, 'Example note 3', 'example-note-3', 'a', 'axcdfdfdd', 0, 1, '2021-03-12', '2021-03-12', 0),
(4, 'Example note 2', 'example-note-2', 'dsdsdss', 'sdsdss', 1, 1, '2021-03-16', '2021-03-16', 0);

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
(1, 'a', 'a', 'a', 0, 0, '$2b$12$GoSfWzTUGAtzQImt1h2ZcuaQlB8vI5FaKPwWAImOX9ilvUh4sPAwy');

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
(0, 1, 0);

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
  MODIFY `EventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `NoteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
