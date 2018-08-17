/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Host           : localhost:3306
Source Database       : tshirtDesign

*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `designs`
-- ----------------------------
DROP TABLE IF EXISTS `designs`;
CREATE TABLE `designs` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

-- ----------------------------
-- Records of designs
-- ----------------------------
INSERT INTO `designs` VALUES ('1', 'Luis Vasquez', 'Guatemala City', '41508981', 'levb20@gmail.com', '1');
INSERT INTO `designs` VALUES ('2', 'Flor de Maria', 'San Jose City', '39392202', 'fm@gmail.com', '1');
INSERT INTO `designs` VALUES ('3', 'Chepe te Presta', 'Managua City', '33839', 'ch@gmail.com', '0');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'lvasquez', '827ccb0eea8a706c4c34a16891f84e7b', '1');
