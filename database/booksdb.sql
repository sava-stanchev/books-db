-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mybooklibrary
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cover` varchar(255) NOT NULL DEFAULT '/posters/default.jpg',
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `description` text,
  `genre` int NOT NULL,
  `year` smallint NOT NULL,
  `language` int NOT NULL,
  `avg_rating` float DEFAULT '0',
  `num_ratings` smallint DEFAULT '0',
  `is_deleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genre` (`genre`),
  KEY `language` (`language`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`genre`) REFERENCES `genres` (`id`),
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`language`) REFERENCES `languages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'/posters/neuromancer.jpg','Neuromancer','William Gibson','Neuromancer is a cyberpunk novel about a group of mercenary criminals who secretly work for an artificial intelligence that\'s trying to break free. Cyberpunk is a genre that focuses on future societies where technology has advanced, but crime and corruption have as well.',20,1984,21,0,0,0),(2,'/posters/winnetou.jpg','Winnetou','Karl May','Karl May\'s most popular work originally published in 1892 and influenced by Harriet Beecher Stowe, Winnetou is the story of a young Apache chief told by his white friend and blood-brother Old Shatterhand. The action takes place in the U.S. Southwest, in the latter half of the 1800s, where the Indian way of life is threatened by the first transcontinental railroad. Winnetou, the only Native Indian chief who could have united the various rival tribes to reach a settlement with the whites, is murdered. His tragic death foreshadows the death of his people. May\'s central theme here, as in much of his work, is the relationship between aggression, racism, and religious intolerance.',13,1892,30,0,0,0),(3,'/posters/mort.jpg','Mort','Terry Pratchett','Death comes to us all. When he came to Mort, he offered him a job.',21,1987,21,0,0,0),(4,'/posters/the-sisters-brothers.jpg','The Sisters Brothers','Patrick deWitt','Hermann Kermit Warm is going to die. The enigmatic and powerful man known only as the Commodore has ordered it, and his henchmen, Eli and Charlie Sisters, will make sure of it. Though Eli doesn\'t share his brother\'s appetite for whiskey and killing, he\'s never known anything else. But their prey isn\'t an easy mark, and on the road from Oregon City to Warm\'s gold-mining claim outside Sacramento, Eli begins to question what he does for a living - and whom he does it for.',13,2011,21,0,0,0),(5,'/posters/the-48-laws-of-power.jpg','The 48 Laws Of Power','Robert Greene','In the book that People magazine proclaimed “beguiling” and “fascinating,” Robert Greene and Joost Elffers have distilled three thousand years of the history of power into 48 essential laws by drawing from the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz and also from the lives of figures ranging from Henry Kissinger to P.T. Barnum.',1,1998,21,0,0,0),(6,'/posters/simulacra-and-simulation.jpg','Simulacra and Simulation','Jean Baudrillard','Baudrillard\'s book represents a unique and original effort to rethink cultural theory from the perspective of a new concept of cultural materialism, one that radically redefines postmodern formulations of the body.',11,1981,26,0,0,0),(7,'/posters/the-brothers-karamazov.jpg','The Brothers Karamazov','Fyodor Dostoyevsky','The Brothers Karamazov is a murder mystery, a courtroom drama, and an exploration of erotic rivalry in a series of triangular love affairs involving the “wicked and sentimental” Fyodor Pavlovich Karamazov and his three sons―the impulsive and sensual Dmitri; the coldly rational Ivan; and the healthy, red-cheeked young novice Alyosha. Through the gripping events of their story, Dostoevsky portrays the whole of Russian life, is social and spiritual striving, in what was both the golden age and a tragic turning point in Russian culture.',13,1880,77,0,0,0),(8,'/posters/the-zuni-cafe-cookbook.jpg','The Zuni Café Cookbook','Judy Rodgers','In The Zuni Café Cookbook, a book customers have been anticipating for years, chef and owner Judy Rodgers provides recipes for Zuni\'s most well-known dishes, ranging from the Zuni Roast Chicken to the Espresso Granita.',6,2002,21,0,0,0),(9,'/posters/patilansko-tsarstvo.jpg','Patilansko Tsarstvo','Ran Bosilek','В тази книга са събрани най-забавните приключения на прочутите патиланци. Веселите истории за Панчо, Данчо, Ганчо, Мика, Дана, Гана и баба Цоцолана са любимо четиво на поколения български деца.',5,1927,11,0,0,0),(10,'/posters/hagakure.jpg','Hagakure','Yamamoto Tsunetomo','It is not a book of philosophy as most would understand the it is a collection of thoughts and sayings recorded over a period of seven years, and as such covers a wide variety of subjects, often in no particular sequence. The work represents an attitude far removed from our modern pragmatism and materialism, and possesses an intuitive rather than rational appeal in its assertion that Bushido is a Way of Dying, and that only a samurai retainer prepared and willing to die at any moment can be totally true to his lord.',18,1900,45,0,0,0),(11,'/posters/retire-before-mom-and-dad.jpg','Retire Before Mom and Dad','Rob Berger','It’s time to claim your financial freedom.',4,2019,21,0,0,0),(12,'/posters/daytripper.jpg','Daytripper','Fábio Moon and Gabriel Bá','In Daytripper, the Eisner Award-winning twin brothers Fábio Moon and Gabriel Bá tell a magical, mysterious and moving story about life itself—a hauntingly lyrical journey that uses the quiet moments to ask the big questions.',12,2010,21,0,0,0),(13,'/posters/notes-from-the-underground.jpg','Notes from the Underground','Fyodor Dostoyevsky','Its nameless hero is a profoundly alienated individual in whose brooding self-analysis there is a search for the true and the good in a world of relative values and few absolutes. Moreover, the novel introduces themes — moral, religious, political and social — that dominated Dostoyevsky\'s later works.',13,1864,77,0,0,0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `date_created` date NOT NULL,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `is_deleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reviews_books` (`book_id`),
  KEY `FK_reviews_users` (`user_id`),
  CONSTRAINT `FK_reviews_books` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_reviews_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'It\'s whatever.','2024-07-16',1,2,0),(2,'It is what it is.','2024-07-16',1,2,0),(3,'Is this even working?','2024-07-16',1,2,0),(4,'Test this out again.. just to make sure!','2024-07-16',1,2,0),(5,'Test this out again.. just to make sure!','2024-07-16',1,2,1),(6,'Goonin\'','2024-07-16',1,2,1);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `tokens_id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`tokens_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjAyNTQ3LCJleHAiOjE3MTEyMDYxNDd9.MK5wb_F9aKe1S3kFhmp4N6PWMlVAUweFh4Rh9cuGO5U'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjAzNDk3LCJleHAiOjE3MTEyMDcwOTd9.ZG5p7BIZ8f6kPp46mZ0uydCAxswDA5y3kfGmh2Eed8c'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjAzNDk3LCJleHAiOjE3MTEyMDcwOTd9.ZG5p7BIZ8f6kPp46mZ0uydCAxswDA5y3kfGmh2Eed8c'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjAzNDk3LCJleHAiOjE3MTEyMDcwOTd9.ZG5p7BIZ8f6kPp46mZ0uydCAxswDA5y3kfGmh2Eed8c'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjA0NTMwLCJleHAiOjE3MTEyMDgxMzB9.JF31oSm4pCbb_dpJrXDgJZoXhbcAO90Qb0dHJGGoleA'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(19,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(22,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(23,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(26,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(27,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(33,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(34,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(36,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzExMjE0NzA4LCJleHAiOjE3MTEyMTgzMDh9.xHloMkecymQA4I8Fa3HZqoVNzDFd4uGehpY4_bKEhc8'),(37,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzExMjg2OTU0LCJleHAiOjE3MTEyOTA1NTR9.xGTszCILgFWLWuizOTF2-tyGyDepUnSbFdYxPWMpAJ0'),(38,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzExMjg4NTQ0LCJleHAiOjE3MTEyOTIxNDR9.dLInipNpi0UszwIDfx1OEJOi9W-42ayZ5mLr0GDhNrc'),(39,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzExMzA1OTU1LCJleHAiOjE3MTEzMDk1NTV9.uzjj45CMg0eeyZENn_Ns2cB9dxcNYp2U1k6x-VnUFeU'),(40,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzIwMTE0MjUyLCJleHAiOjE3MjAxMTc4NTJ9.gs3m1MnFIH3U1BSejnybgt2Q0WF0vtYprm0X0F-AISE'),(41,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzIwMTk4ODYyLCJleHAiOjE3MjAyMDI0NjJ9.I5YBfqmPfZ5B-l55I0mzxr9dwwxNXSKUvs7ehQJPUi0'),(42,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzIwMjU4NjAxLCJleHAiOjE3MjAyNjIyMDF9.BfiV8X1IPddOXaNi1SzGlZ2dbJqEq8-KxOwKKtBnqUo'),(43,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTYXZhOTQiLCJpc19hZG1pbiI6MSwiaWF0IjoxNzIwMzYwMTAxLCJleHAiOjE3MjAzNjM3MDF9.2tBpQOr6ytmbxxw5MjYfXIJ6XM7s4pWVmYFdo05y7Z0'),(44,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJKYW5lbGx6OTkiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzIwOTU5MzA1LCJleHAiOjE3MjA5NjI5MDV9.pOhgTey4jExHzzgC9Y2Eqebq6ga2-U9Ffoq7Fio-L2o'),(45,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJKYW5lbGx6OTkiLCJpc19hZG1pbiI6MCwiaWF0IjoxNzIwOTYxMzM2LCJleHAiOjE3MjA5NjQ5MzZ9.GXxamiAXUN_qw1XKW3E1--9op4DHGw2HLXTU5w10eU0');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `email` varchar(100) NOT NULL,
  `is_admin` tinyint DEFAULT NULL,
  `is_deleted` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sava94','$2b$10$plUKMQTsooQl/Ei3BR.9p.t/YdsN81MZ7qXvsktD8SDL2puDtWlmu','sava94@email.com',1,0),(2,'Janellz99','$2b$10$MrhHe00XLeMJ0v04InO0A.5WYu.WM/YVIE.JjoDFM60yc7CTQIktK','janellz99@email.com',0,0);
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

-- Dump completed on 2024-07-18 21:47:29
