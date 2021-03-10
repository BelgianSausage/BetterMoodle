-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2021 at 11:49 AM
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
  `Description` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `NoteID` int(11) NOT NULL,
  `Title` varchar(32) NOT NULL,
  `Description` varchar(128) NOT NULL,
  `Body` text NOT NULL,
  `ModuleID` int(11) NOT NULL,
  `IsPublic` tinyint(1) NOT NULL,
  `CreatedAt` date NOT NULL,
  `Published` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `Salt` varchar(16) NOT NULL,
  `Hash` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usermodule`
--

CREATE TABLE `usermodule` (
  `UserModuleID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `ModuleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usernote`
--

CREATE TABLE `usernote` (
  `UserNoteID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `NoteID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD KEY `ModuleID` (`ModuleID`);

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
-- Indexes for table `usernote`
--
ALTER TABLE `usernote`
  ADD PRIMARY KEY (`UserNoteID`) USING BTREE,
  ADD KEY `UserID` (`UserID`),
  ADD KEY `NoteID` (`NoteID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`Author`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `lesson`
--
ALTER TABLE `lesson`
  ADD CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`Author`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `lesson_ibfk_2` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ModuleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ModuleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`InstitutionID`) REFERENCES `institution` (`InstitutionID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usermodule`
--
ALTER TABLE `usermodule`
  ADD CONSTRAINT `usermodule_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usermodule_ibfk_2` FOREIGN KEY (`ModuleID`) REFERENCES `module` (`ModuleID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usernote`
--
ALTER TABLE `usernote`
  ADD CONSTRAINT `usernote_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `usernote_ibfk_2` FOREIGN KEY (`NoteID`) REFERENCES `note` (`NoteID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
