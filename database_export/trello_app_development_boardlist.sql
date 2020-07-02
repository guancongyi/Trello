-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: trello_app_development
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boardlist`
--

DROP TABLE IF EXISTS `boardlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boardlist` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `boardId` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` float NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boardlist`
--

LOCK TABLES `boardlist` WRITE;
/*!40000 ALTER TABLE `boardlist` DISABLE KEYS */;
INSERT INTO `boardlist` VALUES (1,9,17,'testBoard',0,'2020-06-24 01:03:32','2020-06-24 01:03:32'),(2,9,17,'testBoard2',0,'2020-06-25 23:50:32','2020-06-25 23:50:32'),(3,9,17,'testBoardList3',0,'2020-06-25 23:50:45','2020-06-25 23:50:45'),(4,9,17,'testList4',0,'2020-06-26 00:58:20','2020-06-26 00:58:20'),(5,9,17,'aaa',65535,'2020-06-26 05:31:18','2020-06-26 05:31:18'),(6,9,17,'bbb',131070,'2020-06-26 05:31:57','2020-06-26 05:31:57'),(7,9,18,'aaa',98302.5,'2020-06-26 05:32:25','2020-07-02 04:03:50'),(8,9,18,'bbb',262140,'2020-06-26 05:32:35','2020-07-02 04:03:43'),(9,9,18,'cccc',196605,'2020-06-26 05:32:37','2020-07-02 04:03:39');
/*!40000 ALTER TABLE `boardlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-01 21:12:58
