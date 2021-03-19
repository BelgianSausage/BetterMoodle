-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2021 at 07:01 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

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
(1, 'Example event 1', '2021-03-24', '19:22', '19:24', 0, 'New description'),
(2, 'Example event 2', '2021-03-18', '15:15', '15:16', 0, 'Example event 2.'),
(3, 'Example event 3', '2021-03-26', '16:50', '17:50', 0, ''),
(5, 'Example event 5', '2021-03-18', '16:20', '17:23', 0, ''),
(6, 'Example event 9', '2021-03-24', '13:41', '16:38', 0, '0'),
(8, 'Example event 12', '2021-03-17', '15:42', '17:44', 0, '0');

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
(6, 0, 'example-lesson-1', 1, 'Example lesson 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium lorem et felis rhoncus pretium. Sed pretium enim li', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium lorem et felis rhoncus pretium. Sed pretium enim libero, ut molestie augue molestie a. Quisque ac tempus diam, non finibus nunc. Vestibulum a finibus arcu, sit amet efficitur tellus. Morbi ut venenatis ex. Proin aliquam eu metus sed luctus. Phasellus ut molestie enim. Integer venenatis sapien a accumsan euismod.\r\n\r\nUt massa justo, maximus ut est et, molestie ullamcorper sem. Quisque odio dui, blandit eget sapien vitae, condimentum iaculis purus. Proin est quam, imperdiet et venenatis id, posuere quis ipsum. Phasellus pulvinar vulputate sollicitudin. Vestibulum dapibus leo rhoncus eros placerat, sit amet blandit arcu fringilla. Aliquam sollicitudin risus ut lorem ultrices lobortis. Sed vel sem elit. Pellentesque molestie maximus dolor. Suspendisse potenti. Donec consectetur, erat et dignissim malesuada, urna ex posuere justo, bibendum egestas lorem ligula quis turpis. Morbi a tincidunt turpis. Quisque id mi metus. Praesent hendrerit felis ante, at scelerisque elit ornare a. Quisque facilisis cursus egestas.\r\n\r\nFusce luctus, sapien eget posuere lobortis, arcu arcu porta massa, eget efficitur velit quam at est. Ut hendrerit est quis enim egestas, eget molestie ipsum aliquam. Cras a magna ex. Donec lectus arcu, sodales vel volutpat a, dignissim sed sem. Vivamus condimentum lorem mauris, at porttitor ante fringilla et. Suspendisse egestas ligula eu posuere aliquam. Phasellus fringilla rhoncus ex vel pretium. Curabitur ut mattis quam. Praesent maximus, leo id rutrum interdum, arcu odio condimentum eros, sit amet commodo nibh nisl sodales lacus.\r\n\r\nEtiam nec diam rhoncus, ullamcorper nibh eget, sodales felis. Nulla non pellentesque dolor. Proin arcu sapien, varius sed diam vitae, finibus malesuada quam. Sed eu purus sit amet lorem tincidunt vulputate. Mauris bibendum at elit sit amet pharetra. Aliquam erat volutpat. Maecenas urna neque, ullamcorper nec lacus ut, ullamcorper commodo leo. Sed bibendum sollicitudin nunc, sed malesuada diam porta efficitur. Nunc vulputate mattis sagittis. Nulla facilisi.\r\n\r\nMauris eget mi vitae arcu sagittis condimentum ac non tortor. Vestibulum id leo nunc. Suspendisse potenti. Cras maximus sodales dignissim. Fusce eget facilisis mi. Praesent molestie augue vel gravida gravida. Vivamus ac nisl aliquet, feugiat tortor non, feugiat nisi. Quisque condimentum, urna et consequat feugiat, orci metus mattis enim, nec vulputate augue ligula id ligula.', '2021-03-17', '0000-00-00'),
(488255, 0, 'example-lesson-2', 1, 'Example lesson 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium lorem et felis rhoncus pretium. Sed pretium enim li', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium lorem et felis rhoncus pretium. Sed pretium enim libero, ut molestie augue molestie a. Quisque ac tempus diam, non finibus nunc. Vestibulum a finibus arcu, sit amet efficitur tellus. Morbi ut venenatis ex. Proin aliquam eu metus sed luctus. Phasellus ut molestie enim. Integer venenatis sapien a accumsan euismod.\r\n\r\nUt massa justo, maximus ut est et, molestie ullamcorper sem. Quisque odio dui, blandit eget sapien vitae, condimentum iaculis purus. Proin est quam, imperdiet et venenatis id, posuere quis ipsum. Phasellus pulvinar vulputate sollicitudin. Vestibulum dapibus leo rhoncus eros placerat, sit amet blandit arcu fringilla. Aliquam sollicitudin risus ut lorem ultrices lobortis. Sed vel sem elit. Pellentesque molestie maximus dolor. Suspendisse potenti. Donec consectetur, erat et dignissim malesuada, urna ex posuere justo, bibendum egestas lorem ligula quis turpis. Morbi a tincidunt turpis. Quisque id mi metus. Praesent hendrerit felis ante, at scelerisque elit ornare a. Quisque facilisis cursus egestas.\r\n\r\nFusce luctus, sapien eget posuere lobortis, arcu arcu porta massa, eget efficitur velit quam at est. Ut hendrerit est quis enim egestas, eget molestie ipsum aliquam. Cras a magna ex. Donec lectus arcu, sodales vel volutpat a, dignissim sed sem. Vivamus condimentum lorem mauris, at porttitor ante fringilla et. Suspendisse egestas ligula eu posuere aliquam. Phasellus fringilla rhoncus ex vel pretium. Curabitur ut mattis quam. Praesent maximus, leo id rutrum interdum, arcu odio condimentum eros, sit amet commodo nibh nisl sodales lacus.\r\n\r\nEtiam nec diam rhoncus, ullamcorper nibh eget, sodales felis. Nulla non pellentesque dolor. Proin arcu sapien, varius sed diam vitae, finibus malesuada quam. Sed eu purus sit amet lorem tincidunt vulputate. Mauris bibendum at elit sit amet pharetra. Aliquam erat volutpat. Maecenas urna neque, ullamcorper nec lacus ut, ullamcorper commodo leo. Sed bibendum sollicitudin nunc, sed malesuada diam porta efficitur. Nunc vulputate mattis sagittis. Nulla facilisi.\r\n\r\nMauris eget mi vitae arcu sagittis condimentum ac non tortor. Vestibulum id leo nunc. Suspendisse potenti. Cras maximus sodales dignissim. Fusce eget facilisis mi. Praesent molestie augue vel gravida gravida. Vivamus ac nisl aliquet, feugiat tortor non, feugiat nisi. Quisque condimentum, urna et consequat feugiat, orci metus mattis enim, nec vulputate augue ligula id ligula.', '2021-03-17', '0000-00-00');

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
(5, 'Artificial Intelligence', 'artificial-intelligence', 'sdsdsdssasdadfd'),
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
(3, 'Example note 3', 'example-note-3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas odio vitae vulputate egestas. Vivamus rutrum erat ac do', '---\r\n__Advertisement :)__\r\n\r\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\r\n  resize in browser.\r\n- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly\r\n  i18n with plurals support and easy syntax.\r\n\r\nYou will like those projects!\r\n\r\n---\r\n\r\n# h1 Heading 8-)\r\n## h2 Heading\r\n### h3 Heading\r\n#### h4 Heading\r\n##### h5 Heading\r\n###### h6 Heading\r\n\r\n\r\n## Horizontal Rules\r\n\r\n___\r\n\r\n---\r\n\r\n***\r\n\r\n\r\n## Typographic replacements\r\n\r\nEnable typographer option to see result.\r\n\r\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\r\n\r\ntest.. test... test..... test?..... test!....\r\n\r\n!!!!!! ???? ,,  -- ---\r\n\r\n\"Smartypants, double quotes\" and \'single quotes\'\r\n\r\n\r\n## Emphasis\r\n\r\n**This is bold text**\r\n\r\n__This is bold text__\r\n\r\n*This is italic text*\r\n\r\n_This is italic text_\r\n\r\n~~Strikethrough~~\r\n\r\n\r\n## Blockquotes\r\n\r\n\r\n> Blockquotes can also be nested...\r\n>> ...by using additional greater-than signs right next to each other...\r\n> > > ...or with spaces between arrows.\r\n\r\n\r\n## Lists\r\n\r\nUnordered\r\n\r\n+ Create a list by starting a line with `+`, `-`, or `*`\r\n+ Sub-lists are made by indenting 2 spaces:\r\n  - Marker character change forces new list start:\r\n    * Ac tristique libero volutpat at\r\n    + Facilisis in pretium nisl aliquet\r\n    - Nulla volutpat aliquam velit\r\n+ Very easy!\r\n\r\nOrdered\r\n\r\n1. Lorem ipsum dolor sit amet\r\n2. Consectetur adipiscing elit\r\n3. Integer molestie lorem at massa\r\n\r\n\r\n1. You can use sequential numbers...\r\n1. ...or keep all the numbers as `1.`\r\n\r\nStart numbering with offset:\r\n\r\n57. foo\r\n1. bar\r\n\r\n\r\n## Code\r\n\r\nInline `code`\r\n\r\nIndented code\r\n\r\n    // Some comments\r\n    line 1 of code\r\n    line 2 of code\r\n    line 3 of code\r\n\r\n\r\nBlock code \"fences\"\r\n\r\n```\r\nSample text here...\r\n```\r\n\r\nSyntax highlighting\r\n\r\n``` js\r\nvar foo = function (bar) {\r\n  return bar++;\r\n};\r\n\r\nconsole.log(foo(5));\r\n```\r\n\r\n## Tables\r\n\r\n| Option | Description |\r\n| ------ | ----------- |\r\n| data   | path to data files to supply the data that will be passed into templates. |\r\n| engine | engine to be used for processing templates. Handlebars is the default. |\r\n| ext    | extension to be used for dest files. |\r\n\r\nRight aligned columns\r\n\r\n| Option | Description |\r\n| ------:| -----------:|\r\n| data   | path to data files to supply the data that will be passed into templates. |\r\n| engine | engine to be used for processing templates. Handlebars is the default. |\r\n| ext    | extension to be used for dest files. |\r\n\r\n\r\n## Links\r\n\r\n[link text](http://dev.nodeca.com)\r\n\r\n[link with title](http://nodeca.github.io/pica/demo/ \"title text!\")\r\n\r\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\r\n\r\n\r\n## Images\r\n\r\n![Minion](https://octodex.github.com/images/minion.png)\r\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \"The Stormtroopocat\")\r\n\r\nLike links, Images also have a footnote style syntax\r\n\r\n![Alt text][id]\r\n\r\nWith a reference later in the document defining the URL location:\r\n\r\n[id]: https://octodex.github.com/images/dojocat.jpg  \"The Dojocat\"\r\n\r\n\r\n## Plugins\r\n\r\nThe killer feature of `markdown-it` is very effective support of\r\n[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).\r\n\r\n\r\n### [Emojies](https://github.com/markdown-it/markdown-it-emoji)\r\n\r\n> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:\r\n>\r\n> Shortcuts (emoticons): :-) :-( 8-) ;)\r\n\r\nsee [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.\r\n\r\n\r\n### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\r\n\r\n- 19^th^\r\n- H~2~O\r\n\r\n\r\n### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)\r\n\r\n++Inserted text++\r\n\r\n\r\n### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)\r\n\r\n==Marked text==\r\n\r\n\r\n### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)\r\n\r\nFootnote 1 link[^first].\r\n\r\nFootnote 2 link[^second].\r\n\r\nInline footnote^[Text of inline footnote] definition.\r\n\r\nDuplicated footnote reference[^second].\r\n\r\n[^first]: Footnote **can have markup**\r\n\r\n    and multiple paragraphs.\r\n\r\n[^second]: Footnote text.\r\n\r\n\r\n### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)\r\n\r\nTerm 1\r\n\r\n:   Definition 1\r\nwith lazy continuation.\r\n\r\nTerm 2 with *inline markup*\r\n\r\n:   Definition 2\r\n\r\n        { some code, part of Definition 2 }\r\n\r\n    Third paragraph of definition 2.\r\n\r\n_Compact style:_\r\n\r\nTerm 1\r\n  ~ Definition 1\r\n\r\nTerm 2\r\n  ~ Definition 2a\r\n  ~ Definition 2b\r\n\r\n\r\n### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)\r\n\r\nThis is HTML abbreviation example.\r\n\r\nIt converts \"HTML\", but keep intact partial entries like \"xxxHTMLyyy\" and so on.\r\n\r\n*[HTML]: Hyper Text Markup Language\r\n\r\n### [Custom containers](https://github.com/markdown-it/markdown-it-container)\r\n\r\n::: warning\r\n*here be dragons*\r\n:::\r\n', 0, 0, '2021-03-12', '2021-03-12', 0),
(4, 'Example note 2', 'example-note-2', 'dsdsdss', 'sdsdss', 1, 1, '2021-03-16', '2021-03-16', 0),
(5, 'Example note 3', 'example-note-3', 'a', 'a', 0, 1, '2021-03-18', '2021-03-18', 0);

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
  MODIFY `NoteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
