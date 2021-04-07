CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `library`;
SET NAMES utf8 ;

DROP TABLE IF EXISTS `genres`;

SET character_set_client = utf8mb4 ;

--
-- Table structure for table `genres`
--

CREATE TABLE `library`.`genres` (
  `genres_id` INT NOT NULL AUTO_INCREMENT,
  `genre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`genres_id`)
);

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres`
VALUES
	(1, 'Self-Help'), (2, 'Biographies'), (3, 'Christian Books & Bibles'), (4, 'Business & Money'),
	(5, 'Children\'s Books'), (6, 'Cookbooks, Food & Wine'), (7, 'Medical'), (8, 'History'),
	(9, 'Health, Fitness & Dieting'), (10, 'Science & Math'), (11, 'Politics & Social Sciences'),
	(12, 'Comics & Graphic Novels'), (13, 'Literature & Fiction'), (14, 'Mystery, Thriller & Suspense'),
	(15, 'Parenting & Relationships'), (16, 'Reference'), (17, 'Humor & Entertainment'), (18, 'Religion & Spirituality'),
	(19, 'Romance'), (20, 'Science Fiction'), (21, 'Fantasy'), (22, 'Teen & Young Adult Books');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

CREATE TABLE `library`.`languages` (
  `languages_id` INT NOT NULL AUTO_INCREMENT,
  `language` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`languages_id`)
);

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages`
VALUES
	(1,'Afrikaans'), (2,'Albanian'), (3,'Amharic'), (4,'Arabic'), (5,'Armenian'), (6,'Azerbaijani'),
	(7,'Basque'), (8,'Belarusian'), (9,'Bengali'), (10,'Bosnian'), (11,'Bulgarian'), (12,'Catalan'),
	(13,'Cebuano'), (14,'Chichewa'), (15,'Chinese'), (16,'Corsican'), (17,'Croatian'), (18,'Czech'),
	(19,'Danish'), (20,'Dutch'), (21,'English'), (22,'Esperanto'), (23,'Estonian'), (24,'Filipino'),
	(25,'Finnish'), (26,'French'), (27,'Frisian'), (28,'Galician'), (29,'Georgian'), (30,'German'),
	(31,'Greek'), (32,'Gujarati'), (33,'Haitian Creole'), (34,'Hausa'), (35,'Hawaiian'), (36,'Hebrew'),
	(37,'Hindi'), (38,'Hmong'), (39,'Hungarian'), (40,'Icelandic'), (41,'Igbo'), (42,'Indonesian'),
	(43,'Irish'), (44,'Italian'), (45,'Japanese'), (46,'Javanese'), (47,'Kannada'), (48,'Kazakh'),
	(49,'Khmer'), (50,'Kinyarwanda'), (51,'Korean'), (52,'Kurdish (Kurmanji)'), (53,'Kyrgyz'), (54,'Lao'),
	(55,'Latin'), (56,'Latvian'), (57,'Lithuanian'), (58,'Luxembourgish'), (59,'Macedonian'), (60,'Malagasy'),
	(61,'Malay'), (62,'Malayalam'), (63,'Maltese'), (64,'Maori'), (65,'Marathi'), (66,'Mongolian'), 
	(67,'Myanmar (Burmese)'), (68,'Nepali'), (69,'Norwegian'), (70,'Odia (Oriya)'), (71,'Pashto'), 
	(72,'Persian'), (73,'Polish'), (74,'Portuguese'), (75,'Punjabi'), (76,'Romanian'), (77,'Russian'), 
	(78,'Samoan'), (79,'Scots Gaelic'), (80,'Serbian'), (81,'Sesotho'), (82,'Shona'), (83,'Sindhi'),
	(84,'Sinhala'), (85,'Slovak'), (86,'Slovenian'), (87,'Somali'), (88,'Spanish'), (89,'Sundanese'),
	(90,'Swahili'), (91,'Swedish'), (92,'Tajik'), (93,'Tamil'), (94,'Tatar'), (95,'Telugu'), (96,'Thai'),
	(97,'Turkish'), (98,'Turkmen'), (99,'Ukrainian'), (100,'Urdu'), (101,'Uyghur'), (102,'Uzbek'),
	(103,'Vietnamese'), (104,'Welsh'), (105,'Xhosa'), (106,'Yiddish'), (107,'Yoruba'), (108,'Zulu')
;
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

CREATE TABLE `library`.`genders` (
  `genders_id` INT NOT NULL AUTO_INCREMENT,
  `gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`genders_id`)
);

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders`
VALUES
	(1, 'Female'), (2, 'Male');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

CREATE TABLE `library`.`users` (
  `users_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `user_age` INT NULL,
  `e_mail` VARCHAR(45) NOT NULL,
  `isAdmin` BIT(0) NOT NULL,
  `isDeleted` BIT(0) NOT NULL,
  `isBanned` BIT(0) NOT NULL,
  `gender` INT NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
  INDEX `fk_users_genders_genders_id_idx` (`gender` ASC) VISIBLE,
  CONSTRAINT `fk_users_genders_genders_id`
    FOREIGN KEY (`gender`)
    REFERENCES `library`.`genders` (`genders_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
	
--
-- Table structure for table `books`
--

CREATE TABLE `library`.`books` (
  `books_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `genre` INT NOT NULL,
  `age_recommendation` INT NULL,
  `isbn` VARCHAR(45) NULL,
  `publication_date` INT NULL,
  `language` INT NOT NULL,
  `print_length` INT NULL,
  `isDeleted` BIT(0) NOT NULL,
  `isBorrowed` BIT(0) NOT NULL,
  `book_count` INT NOT NULL,
  `reading_count` INT NOT NULL,
  `crated_by` INT NOT NULL,
  PRIMARY KEY (`books_id`),
  INDEX `fk_books_generes_genre_id_idx` (`genre` ASC) VISIBLE,
  INDEX `fk_books_languages_languages_id_idx` (`language` ASC) VISIBLE,
  INDEX `fk_books_users_users_id_idx` (`crated_by` ASC) VISIBLE,
  CONSTRAINT `fk_books_generes_genre_id`
    FOREIGN KEY (`genre`)
    REFERENCES `library`.`genres` (`genres_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_languages_languages_id`
    FOREIGN KEY (`language`)
    REFERENCES `library`.`languages` (`languages_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_users_users_id`
    FOREIGN KEY (`crated_by`)
    REFERENCES `library`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--
-- Table structure for table `reviews`
--

CREATE TABLE `library`.`reviews` (
  `reviews_id` INT NOT NULL AUTO_INCREMENT,
  `content` LONGTEXT NOT NULL,
  `date_created` DATE NOT NULL,
  `created_by` INT NOT NULL,
  `book_title` INT NOT NULL,
  `isDeleted` BIT(0) NOT NULL,
  PRIMARY KEY (`reviews_id`),
  INDEX `fk_reviews_users_users_id_idx` (`created_by` ASC) VISIBLE,
  INDEX `fk_reviews_books_books_id_idx` (`book_title` ASC) VISIBLE,
  CONSTRAINT `fk_reviews_users_users_id`
    FOREIGN KEY (`created_by`)
    REFERENCES `library`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_books_books_id`
    FOREIGN KEY (`book_title`)
    REFERENCES `library`.`books` (`books_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
	
--
-- Table structure for table `review_likes`
--

CREATE TABLE `library`.`review_likes` (
  `review_likes_id` INT NOT NULL AUTO_INCREMENT,
  `created_by` INT NOT NULL,
  `review` INT NOT NULL,
  `reaction` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`review_likes_id`),
  INDEX `fk_review_likes_users_users_id_idx` (`created_by` ASC) VISIBLE,
  INDEX `fk_review_likes_reviews_reviews_id_idx` (`review` ASC) VISIBLE,
  CONSTRAINT `fk_review_likes_users_users_id`
    FOREIGN KEY (`created_by`)
    REFERENCES `library`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_likes_reviews_reviews_id`
    FOREIGN KEY (`review`)
    REFERENCES `library`.`reviews` (`reviews_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
	
--
-- Table structure for table `book_ratings`
--

CREATE TABLE `library`.`book_ratings` (
  `book_ratings_id` INT NOT NULL AUTO_INCREMENT,
  `created_by` INT NOT NULL,
  `book` INT NOT NULL,
  `rating` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`book_ratings_id`),
  INDEX `fk_book_ratings_users_users_id_idx` (`created_by` ASC) VISIBLE,
  INDEX `fk_book_ratings_books_books_id_idx` (`book` ASC) VISIBLE,
  CONSTRAINT `fk_book_ratings_users_users_id`
    FOREIGN KEY (`created_by`)
    REFERENCES `library`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_ratings_books_books_id`
    FOREIGN KEY (`book`)
    REFERENCES `library`.`books` (`books_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
