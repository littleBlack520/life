-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-01-16 11:08:02
-- 服务器版本： 5.1.28-rc-community
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `life`
--

-- --------------------------------------------------------

--
-- 表的结构 `life_hope`
--

CREATE TABLE IF NOT EXISTS `life_hope` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `life_hope`
--

INSERT INTO `life_hope` (`id`, `username`, `content`, `time`) VALUES
(1, '1', '村', 1484549654),
(2, '2', '村', 1484549767),
(3, '3', '村', 1484552408),
(4, '4', '村', 1484552418),
(5, '5', '村s', 1484552449),
(6, '6', '村s', 2017),
(7, '7', '村s', 2017),
(8, '8', '村s', 2017),
(9, '9', '村s', 2017),
(10, '10', '村s', 1484556050),
(11, '11', '村s', 1484556297),
(12, '12', '村s', 1484556299),
(13, '枯在', '村s', 1484558765),
(14, 'tete', 'tewt', 1484560632),
(15, 'wkgwg', 'wgwdgdfe', 1484560742),
(16, '我是帅哥', '哈哈哈只一保一人一中', 1484560904),
(17, '我是一个帅哥', '我要成为海爷', 1484561081);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
