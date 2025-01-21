CREATE DATABASE  IF NOT EXISTS `books` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `books`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: books
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `book_ratings`
--

DROP TABLE IF EXISTS `book_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `rating` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_book_ratings_users` (`user_id`),
  KEY `FK_book_ratings_books` (`book_id`),
  CONSTRAINT `FK_book_ratings_books` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_book_ratings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_ratings`
--

LOCK TABLES `book_ratings` WRITE;
/*!40000 ALTER TABLE `book_ratings` DISABLE KEYS */;
INSERT INTO `book_ratings` VALUES (1,6,1,3),(2,6,2,1),(3,6,6,4),(4,1,1,4),(5,1,3,3),(6,1,6,5),(7,1,2,2),(8,2,1,5),(9,2,3,4),(10,2,4,2),(11,2,5,5),(12,3,1,2),(13,3,10,5),(14,3,4,3);
/*!40000 ALTER TABLE `book_ratings` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `books` VALUES (1,'/posters/neuromancer.jpg','Neuromancer','William Gibson','Neuromancer is a cyberpunk novel about a group of mercenary criminals who secretly work for an artificial intelligence that\'s trying to break free. Cyberpunk is a genre that focuses on future societies where technology has advanced, but crime and corruption have as well.',20,1984,21,3.5,4,0),(2,'/posters/winnetou.jpg','Winnetou','Karl May','Karl May\'s most popular work originally published in 1892 and influenced by Harriet Beecher Stowe, Winnetou is the story of a young Apache chief told by his white friend and blood-brother Old Shatterhand. The action takes place in the U.S. Southwest, in the latter half of the 1800s, where the Indian way of life is threatened by the first transcontinental railroad. Winnetou, the only Native Indian chief who could have united the various rival tribes to reach a settlement with the whites, is murdered. His tragic death foreshadows the death of his people. May\'s central theme here, as in much of his work, is the relationship between aggression, racism, and religious intolerance.',13,1892,30,1.5,2,0),(3,'/posters/mort.jpg','Mort','Terry Pratchett','Death comes to us all. When he came to Mort, he offered him a job.',21,1987,21,3.5,2,0),(4,'/posters/the-sisters-brothers.jpg','The Sisters Brothers','Patrick deWitt','Hermann Kermit Warm is going to die. The enigmatic and powerful man known only as the Commodore has ordered it, and his henchmen, Eli and Charlie Sisters, will make sure of it. Though Eli doesn\'t share his brother\'s appetite for whiskey and killing, he\'s never known anything else. But their prey isn\'t an easy mark, and on the road from Oregon City to Warm\'s gold-mining claim outside Sacramento, Eli begins to question what he does for a living - and whom he does it for.',13,2011,21,2.5,2,0),(5,'/posters/the-48-laws-of-power.jpg','The 48 Laws Of Power','Robert Greene','In the book that People magazine proclaimed “beguiling” and “fascinating,” Robert Greene and Joost Elffers have distilled three thousand years of the history of power into 48 essential laws by drawing from the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz and also from the lives of figures ranging from Henry Kissinger to P.T. Barnum.',1,1998,21,5,1,0),(6,'/posters/simulacra-and-simulation.jpg','Simulacra and Simulation','Jean Baudrillard','Baudrillard\'s book represents a unique and original effort to rethink cultural theory from the perspective of a new concept of cultural materialism, one that radically redefines postmodern formulations of the body.',11,1981,26,4.5,2,0),(7,'/posters/the-brothers-karamazov.jpg','The Brothers Karamazov','Fyodor Dostoyevsky','The Brothers Karamazov is a murder mystery, a courtroom drama, and an exploration of erotic rivalry in a series of triangular love affairs involving the “wicked and sentimental” Fyodor Pavlovich Karamazov and his three sons―the impulsive and sensual Dmitri; the coldly rational Ivan; and the healthy, red-cheeked young novice Alyosha. Through the gripping events of their story, Dostoevsky portrays the whole of Russian life, is social and spiritual striving, in what was both the golden age and a tragic turning point in Russian culture.',13,1880,77,0,0,0),(8,'/posters/the-zuni-cafe-cookbook.jpg','The Zuni Café Cookbook','Judy Rodgers','In The Zuni Café Cookbook, a book customers have been anticipating for years, chef and owner Judy Rodgers provides recipes for Zuni\'s most well-known dishes, ranging from the Zuni Roast Chicken to the Espresso Granita.',6,2002,21,0,0,0),(9,'/posters/patilansko-tsarstvo.jpg','Patilansko Tsarstvo','Ran Bosilek','В тази книга са събрани най-забавните приключения на прочутите патиланци. Веселите истории за Панчо, Данчо, Ганчо, Мика, Дана, Гана и баба Цоцолана са любимо четиво на поколения български деца.',5,1927,11,0,0,0),(10,'/posters/hagakure.jpg','Hagakure','Yamamoto Tsunetomo','It is not a book of philosophy as most would understand the it is a collection of thoughts and sayings recorded over a period of seven years, and as such covers a wide variety of subjects, often in no particular sequence. The work represents an attitude far removed from our modern pragmatism and materialism, and possesses an intuitive rather than rational appeal in its assertion that Bushido is a Way of Dying, and that only a samurai retainer prepared and willing to die at any moment can be totally true to his lord.',18,1900,45,5,1,0),(11,'/posters/retire-before-mom-and-dad.jpg','Retire Before Mom and Dad','Rob Berger','It’s time to claim your financial freedom.',4,2019,21,0,0,0),(12,'/posters/daytripper.jpg','Daytripper','Fábio Moon and Gabriel Bá','In Daytripper, the Eisner Award-winning twin brothers Fábio Moon and Gabriel Bá tell a magical, mysterious and moving story about life itself—a hauntingly lyrical journey that uses the quiet moments to ask the big questions.',12,2010,21,0,0,0),(13,'/posters/notes-from-the-underground.jpg','Notes from the Underground','Fyodor Dostoyevsky','Its nameless hero is a profoundly alienated individual in whose brooding self-analysis there is a search for the true and the good in a world of relative values and few absolutes. Moreover, the novel introduces themes — moral, religious, political and social — that dominated Dostoyevsky\'s later works.',13,1864,77,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Interesting...','2025-01-21',1,6,0),(2,'Quite intriguing!','2025-01-21',4,1,0),(3,'I didn\'t really enjoy it..','2025-01-21',4,2,0),(4,'it is what it is I guess.','2025-01-21',6,1,0),(5,'average..','2025-01-21',1,3,0),(6,'I didn\'t finish it.. got bored.','2025-01-21',2,4,0),(7,'Plenty of rules to live by in this one.','2025-01-21',3,10,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `email` varchar(100) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sava94','$2b$10$zdq8fwbK2Tvc5a2EG0flLu64mIGdX6xXJQuXwL6kxD9uH4RVA5zQe','sava94@email.com',1,0),(2,'Janellz99','$2b$10$B1rXaiL674L7.ATAo1Ofm.rtAnJG46cSwzfAO4F5ei3nSB2PrV7fy','janellz99@email.com',0,0),(3,'Barksdale70','$2b$10$4eTHiR5Hfq8892zDLUtdBeGgfOwqD7uME3w0HznFE2.jwcYB9.IKC','barksdale70@email.com',0,0),(4,'Jingxuan96','$2b$10$yXdgB.388elZoCk05.3F/Omd4npo3jPZRzZqer8mYfbAtfTdJjRyy','jingxuan96@email.com',0,0),(5,'Niko75','$2b$10$AGH4oiUeKT4ozE91bP1Qb.VF3e3xeBIkFFjSZcqt7bSpq9t6BFvFq','niko75@email.com',0,0),(6,'Devlin90','$2b$10$8WmH.KWoaYGky239g4pTau.hgafh9gRRSSHWf9GLCXFDl/kM3y0hW','devlin90@email.com',0,0),(7,'Icyspicy','$2b$10$p8VB5RrSGaSuNMZV4dxLw.NLDVeEOLwEyV.SyBehNvyPdlbfepVjy','icyspicy@email.com',0,0);
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

-- Dump completed on 2025-01-21 21:51:57
