CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `library`;
-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: library
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `books_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `genre` int(11) NOT NULL,
  `age_recommendation` int(11) DEFAULT NULL,
  `isbn` varchar(45) DEFAULT NULL,
  `publishing_year` int(11) DEFAULT NULL,
  `language` int(11) NOT NULL,
  `print_length` int(11) DEFAULT NULL,
  `is_deleted` tinyint(3) NOT NULL,
  `is_borrowed` tinyint(3) NOT NULL,
  `book_count` int(11) NOT NULL,
  `reading_count` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `posters` varchar(255) NOT NULL DEFAULT '/posters/default.jpg',
  PRIMARY KEY (`books_id`),
  KEY `fk_books_generes_genre_id_idx` (`genre`),
  KEY `fk_books_languages_languages_id_idx` (`language`),
  KEY `fk_books_users_users_id_idx` (`created_by`),
  CONSTRAINT `fk_books_generes_genre_id` FOREIGN KEY (`genre`) REFERENCES `genres` (`genres_id`),
  CONSTRAINT `fk_books_languages_languages_id` FOREIGN KEY (`language`) REFERENCES `languages` (`languages_id`),
  CONSTRAINT `fk_books_users_users_id` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Patilansko Tsarstvo','Ran Bosilek',1,1,NULL,1927,1,100,0,0,1,0,1,'/posters/patilansko-carstvo.jpg'),(2,'Winnetou','Karl May',1,4,NULL,1892,3,99,0,0,1,0,1,'/posters/winnetou.jpg'),(3,'Mort','Terry Pratchett',2,12,'0575041714',1987,3,304,0,0,1,0,1,'/posters/mort.jpg'),(4,'Interesting Times','Terry Pratchett',2,12,'0575058005',1995,3,236,0,0,1,0,1,'/posters/interesting-times.jpg'),(5,'The 48 Laws Of Power','Robert Greene',1,8,'0000000000',1998,19,486,0,0,1,0,1,'/posters/the-48-laws-of-power.jpg'),(6,'Mort 2','Terry Pratchett',1,12,'0575041714',NULL,40,304,1,0,1,0,1,'/posters/default.jpg'),(7,'Mort 45','Terry Pratchett',1,12,'0575041714',NULL,40,304,0,0,1,0,1,'/posters/default.jpg'),(8,'Cose bose','Terry Pratchett',1,12,'0575041714',NULL,40,304,0,0,1,0,1,'/posters/default.jpg'),(9,'Mort6000','Terry Pratchett',5,12,'0575041714',1987,10,304,0,0,1,0,1,'/posters/default.jpg'),(10,'New book','Terry Pratchett',5,12,'0575041714',1987,10,304,0,0,1,0,1,'/posters/default.jpg'),(11,'New book 2','Terry Pratchett',5,12,'0575041714',1987,10,304,0,0,1,0,1,'/posters/default.jpg'),(12,'New book 3','Terry Pratchett',5,12,'0575041714',1987,10,304,0,0,1,0,1,'/posters/default.jpg'),(13,'asdwew','wqewqe',13,12,'1234567891',1235,20,12,0,0,1,0,1,'/posters/default.jpg');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_ratings`
--

DROP TABLE IF EXISTS `books_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books_ratings` (
  `book_ratings_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  `ratings_id` int(11) NOT NULL,
  `is_deleted` tinyint(3) NOT NULL,
  PRIMARY KEY (`book_ratings_id`),
  KEY `fk_book_ratings_users_users_id_idx` (`users_id`),
  KEY `fk_book_ratings_books_books_id_idx` (`books_id`),
  KEY `fk_book_ratings_ratings_ratings_id_idx` (`ratings_id`),
  CONSTRAINT `fk_book_ratings_books_books_id` FOREIGN KEY (`books_id`) REFERENCES `books` (`books_id`),
  CONSTRAINT `fk_book_ratings_ratings_ratings_id` FOREIGN KEY (`ratings_id`) REFERENCES `ratings` (`ratings_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_ratings_users_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_ratings`
--

LOCK TABLES `books_ratings` WRITE;
/*!40000 ALTER TABLE `books_ratings` DISABLE KEYS */;
INSERT INTO `books_ratings` VALUES (16,6,1,5,0),(26,6,5,2,0),(34,6,4,5,0),(35,1,7,5,0),(38,1,9,5,0),(39,6,9,1,0),(40,1,1,5,0);
/*!40000 ALTER TABLE `books_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genders` (
  `genders_id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(45) NOT NULL,
  PRIMARY KEY (`genders_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'Female'),(2,'Male');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `genres_id` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(45) NOT NULL,
  PRIMARY KEY (`genres_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Self-Help'),(2,'Biographies'),(3,'Christian Books & Bibles'),(4,'Business & Money'),(5,'Children\'s Books'),(6,'Cookbooks, Food & Wine'),(7,'Medical'),(8,'History'),(9,'Health, Fitness & Dieting'),(10,'Science & Math'),(11,'Politics & Social Sciences'),(12,'Comics & Graphic Novels'),(13,'Literature & Fiction'),(14,'Mystery, Thriller & Suspense'),(15,'Parenting & Relationships'),(16,'Reference'),(17,'Humor & Entertainment'),(18,'Religion & Spirituality'),(19,'Romance'),(20,'Science Fiction'),(21,'Fantasy'),(22,'Teen & Young Adult Books');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `languages_id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(45) NOT NULL,
  PRIMARY KEY (`languages_id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'Afrikaans'),(2,'Albanian'),(3,'Amharic'),(4,'Arabic'),(5,'Armenian'),(6,'Azerbaijani'),(7,'Basque'),(8,'Belarusian'),(9,'Bengali'),(10,'Bosnian'),(11,'Bulgarian'),(12,'Catalan'),(13,'Cebuano'),(14,'Chichewa'),(15,'Chinese'),(16,'Corsican'),(17,'Croatian'),(18,'Czech'),(19,'Danish'),(20,'Dutch'),(21,'English'),(22,'Esperanto'),(23,'Estonian'),(24,'Filipino'),(25,'Finnish'),(26,'French'),(27,'Frisian'),(28,'Galician'),(29,'Georgian'),(30,'German'),(31,'Greek'),(32,'Gujarati'),(33,'Haitian Creole'),(34,'Hausa'),(35,'Hawaiian'),(36,'Hebrew'),(37,'Hindi'),(38,'Hmong'),(39,'Hungarian'),(40,'Icelandic'),(41,'Igbo'),(42,'Indonesian'),(43,'Irish'),(44,'Italian'),(45,'Japanese'),(46,'Javanese'),(47,'Kannada'),(48,'Kazakh'),(49,'Khmer'),(50,'Kinyarwanda'),(51,'Korean'),(52,'Kurdish (Kurmanji)'),(53,'Kyrgyz'),(54,'Lao'),(55,'Latin'),(56,'Latvian'),(57,'Lithuanian'),(58,'Luxembourgish'),(59,'Macedonian'),(60,'Malagasy'),(61,'Malay'),(62,'Malayalam'),(63,'Maltese'),(64,'Maori'),(65,'Marathi'),(66,'Mongolian'),(67,'Myanmar (Burmese)'),(68,'Nepali'),(69,'Norwegian'),(70,'Odia (Oriya)'),(71,'Pashto'),(72,'Persian'),(73,'Polish'),(74,'Portuguese'),(75,'Punjabi'),(76,'Romanian'),(77,'Russian'),(78,'Samoan'),(79,'Scots Gaelic'),(80,'Serbian'),(81,'Sesotho'),(82,'Shona'),(83,'Sindhi'),(84,'Sinhala'),(85,'Slovak'),(86,'Slovenian'),(87,'Somali'),(88,'Spanish'),(89,'Sundanese'),(90,'Swahili'),(91,'Swedish'),(92,'Tajik'),(93,'Tamil'),(94,'Tatar'),(95,'Telugu'),(96,'Thai'),(97,'Turkish'),(98,'Turkmen'),(99,'Ukrainian'),(100,'Urdu'),(101,'Uyghur'),(102,'Uzbek'),(103,'Vietnamese'),(104,'Welsh'),(105,'Xhosa'),(106,'Yiddish'),(107,'Yoruba'),(108,'Zulu');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `ratings_id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` varchar(45) NOT NULL,
  PRIMARY KEY (`ratings_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reactions` (
  `reactions_id` int(11) NOT NULL AUTO_INCREMENT,
  `reaction` varchar(45) NOT NULL,
  PRIMARY KEY (`reactions_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (1,'smiley'),(2,'laughing'),(3,'sad'),(4,'angry'),(5,'crying'),(6,'surprise'),(7,'shock'),(8,'yawn'),(9,'kiss'),(10,'heart'),(11,'broken-heart');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `records` (
  `records_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  `date_borrowed` date NOT NULL,
  `date_to_return` date NOT NULL,
  `date_returned` date DEFAULT NULL,
  PRIMARY KEY (`records_id`),
  KEY `fk_records_users_user_id_idx` (`users_id`),
  KEY `fk_records_books_book_id_idx` (`books_id`),
  CONSTRAINT `fk_records_books_book_id` FOREIGN KEY (`books_id`) REFERENCES `books` (`books_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_records_users_user_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
INSERT INTO `records` VALUES (31,4,1,'2021-05-09','2021-05-29','2021-05-09'),(32,4,1,'2021-05-09','2021-05-29','2021-05-09'),(33,1,4,'2021-05-09','2021-05-29','2021-05-09'),(34,1,1,'2021-05-10','2021-05-30','2021-05-10'),(35,6,1,'2021-05-10','2021-05-30','2021-05-10');
/*!40000 ALTER TABLE `records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_likes`
--

DROP TABLE IF EXISTS `review_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_likes` (
  `review_likes_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `reviews_id` int(11) NOT NULL,
  `is_deleted` tinyint(3) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislike` int(11) NOT NULL,
  PRIMARY KEY (`review_likes_id`),
  KEY `fk_review_likes_users_users_id_idx` (`users_id`),
  KEY `fk_review_likes_reviews_reviews_id_idx` (`reviews_id`),
  CONSTRAINT `fk_review_likes_reviews_reviews_id` FOREIGN KEY (`reviews_id`) REFERENCES `reviews` (`reviews_id`),
  CONSTRAINT `fk_review_likes_users_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_likes`
--

LOCK TABLES `review_likes` WRITE;
/*!40000 ALTER TABLE `review_likes` DISABLE KEYS */;
INSERT INTO `review_likes` VALUES (30,6,1,0,1,0),(31,1,18,0,0,1),(32,1,11,0,0,1),(33,4,10,0,1,0),(34,7,1,0,0,1);
/*!40000 ALTER TABLE `review_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `reviews_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `date_created` date NOT NULL,
  `users_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  `is_deleted` tinyint(3) NOT NULL,
  PRIMARY KEY (`reviews_id`),
  KEY `fk_reviews_users_users_id_idx` (`users_id`),
  KEY `fk_reviews_books_books_id_idx` (`books_id`),
  CONSTRAINT `fk_reviews_books_books_id` FOREIGN KEY (`books_id`) REFERENCES `books` (`books_id`),
  CONSTRAINT `fk_reviews_users_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Brand new content on any review!','2021-04-12',1,1,0),(2,'Some content 1','2021-04-15',6,3,0),(3,'+88888666666666','2021-04-15',1,3,1),(4,'Some content 2','2021-04-15',6,6,1),(5,'Some content 3','2021-04-15',1,6,0),(6,'Some content 4','2021-04-15',2,6,0),(7,'Some content 5','2021-04-15',3,6,0),(8,'Some content 6','2021-04-15',4,6,0),(9,'Some content 7','2021-04-15',5,6,0),(10,'Promqna na content1','2021-04-15',6,2,0),(11,'Some content 9','2021-04-15',6,1,0),(12,'Some content 10','2021-04-15',6,5,0),(13,'Some content 11','2021-04-15',6,7,0),(14,'2 is asdfasfsadf','2021-04-15',6,8,1),(16,'Some new review!','2021-04-18',1,9,0),(17,'asdasdasdsadasdasdsad','2021-05-08',1,4,1),(18,'Margaritka review','2021-05-09',4,1,0),(19,'Some review for book','2021-05-09',4,4,0),(20,'Margaritken reviw','2021-05-10',4,2,0),(21,'Rozalinda reviews','2021-05-10',7,2,0),(22,'Rozalinda review for 1 book','2021-05-10',7,1,0);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `tokens_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`tokens_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `users_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` longtext NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_age` int(11) DEFAULT NULL,
  `e_mail` varchar(45) NOT NULL,
  `is_admin` tinyint(3) NOT NULL,
  `is_deleted` tinyint(3) NOT NULL,
  `ban_date` datetime DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `fk_users_genders_genders_id_idx` (`gender`),
  CONSTRAINT `fk_users_genders_genders_id` FOREIGN KEY (`gender`) REFERENCES `genders` (`genders_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ivan','$2b$10$6GvQNt0ej0u7pVNp.APhj.SHTEZm/xjGmJ0KYHRb9dcTjZ8PiIGYK','Ivan','Ivanov',102,'email@email.com',1,1,NULL,1),(2,'Dragan','$2b$10$dFUL/4t8DcipKUgzyLYTXuL7OwuNddg.JF3XxNZbC3zkonxo.9Oqa','Dragan','Draganov',99,'email@email.com',0,0,NULL,1),(3,'Gudio','$2b$10$d1bhnDCSGjxbTODD7wKLdeFbELtGdFbsX62Xg4xrtF.7LrkJokJTe','Gudio','Gudev',1,'email@email.com',0,0,NULL,1),(4,'Margaritka','$2b$10$OBhza.yTsFBSpI6jvBlUqO/uiyUund1WEyE5OyyunzonLcy6HOnge','Margaritka','Tcvetkova',23,'email@email.com',0,0,NULL,1),(5,'Tcvetelinka','$2b$10$VxPczxMYA0ktVy1xEt6ATu4txKcMtPbvN130EP1NE9.pQLgj09Qie','Tcvetelinka','Protnikova',22,'email@email.com',0,0,NULL,1),(6,'Kina','$2b$10$.pWJJblSVlJMz1LZjZH4UORKAskCA3.C1xH0KAWBiHOFgcEEWKvBq','Kina','Chugunova',99,'email@email.com',0,0,NULL,1),(7,'Roza','$2b$10$EyIazoccCd7UNEQBJZoRNOnEplCo3cQMw8jY1X/.oE45TCrW3gNw6','Roza','Chugunova',92,'email@email.com',1,0,NULL,1),(12,'Kalin','$2b$10$fRLYYJpPbRHmxwgdYoDPT.OyPYAm6GE9cWoA2cqzlAG38me.9S2H2','Kalin','Borov',NULL,'email@email.com',0,0,NULL,NULL),(19,'Bidy','$2b$10$R052N6ijHgfxjKkzF.woAuE7SlRLVFpBL6zCCFdbXQ0JddwY4CW7i','Bibi','Dimitrova',20,'email@email.com',0,0,NULL,2),(20,'Samodiva','$2b$10$RW8L/Kn.Xzv5xu3/2JwMteEXHAJpWzXZqpX0uKAfdYN13bRAaPCyW','Samodiva','Polqnkova',435,'s@mail.com',0,0,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'library'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-10 19:45:58
