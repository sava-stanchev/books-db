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
-- Table structure for table `book_ratings`
--

DROP TABLE IF EXISTS `book_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_ratings` (
  `book_ratings_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` int(11) NOT NULL,
  `book` int(11) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  PRIMARY KEY (`book_ratings_id`),
  KEY `fk_book_ratings_users_users_id_idx` (`created_by`),
  KEY `fk_book_ratings_books_books_id_idx` (`book`),
  CONSTRAINT `fk_book_ratings_books_books_id` FOREIGN KEY (`book`) REFERENCES `books` (`books_id`),
  CONSTRAINT `fk_book_ratings_users_users_id` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_ratings`
--

LOCK TABLES `book_ratings` WRITE;
/*!40000 ALTER TABLE `book_ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_ratings` ENABLE KEYS */;
UNLOCK TABLES;

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
  `is_deleted` bit(1) NOT NULL,
  `is_borrowed` bit(1) NOT NULL,
  `book_count` int(11) NOT NULL,
  `reading_count` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  PRIMARY KEY (`books_id`),
  KEY `fk_books_generes_genre_id_idx` (`genre`),
  KEY `fk_books_languages_languages_id_idx` (`language`),
  KEY `fk_books_users_users_id_idx` (`created_by`),
  CONSTRAINT `fk_books_generes_genre_id` FOREIGN KEY (`genre`) REFERENCES `genres` (`genres_id`),
  CONSTRAINT `fk_books_languages_languages_id` FOREIGN KEY (`language`) REFERENCES `languages` (`languages_id`),
  CONSTRAINT `fk_books_users_users_id` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
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
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `records` (
  `records_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `date_borrowed` date NOT NULL,
  `date_to_return` date NOT NULL,
  `date_returned` varchar(45) NOT NULL,
  PRIMARY KEY (`records_id`),
  KEY `fk_records_users_user_id_idx` (`user_id`),
  KEY `fk_records_books_book_id_idx` (`book_id`),
  CONSTRAINT `fk_records_books_book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`books_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_records_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `records`
--

LOCK TABLES `records` WRITE;
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
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
  `created_by` int(11) NOT NULL,
  `review` int(11) NOT NULL,
  `reaction` varchar(45) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  PRIMARY KEY (`review_likes_id`),
  KEY `fk_review_likes_users_users_id_idx` (`created_by`),
  KEY `fk_review_likes_reviews_reviews_id_idx` (`review`),
  CONSTRAINT `fk_review_likes_reviews_reviews_id` FOREIGN KEY (`review`) REFERENCES `reviews` (`reviews_id`),
  CONSTRAINT `fk_review_likes_users_users_id` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_likes`
--

LOCK TABLES `review_likes` WRITE;
/*!40000 ALTER TABLE `review_likes` DISABLE KEYS */;
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
  `created_by` int(11) NOT NULL,
  `book_title` int(11) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  PRIMARY KEY (`reviews_id`),
  KEY `fk_reviews_users_users_id_idx` (`created_by`),
  KEY `fk_reviews_books_books_id_idx` (`book_title`),
  CONSTRAINT `fk_reviews_books_books_id` FOREIGN KEY (`book_title`) REFERENCES `books` (`books_id`),
  CONSTRAINT `fk_reviews_users_users_id` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
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
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_age` int(11) DEFAULT NULL,
  `e_mail` varchar(45) NOT NULL,
  `is_admin` bit(1) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `is_banned` bit(1) NOT NULL,
  `gender` int(11) NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `fk_users_genders_genders_id_idx` (`gender`),
  CONSTRAINT `fk_users_genders_genders_id` FOREIGN KEY (`gender`) REFERENCES `genders` (`genders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-13  8:43:42
