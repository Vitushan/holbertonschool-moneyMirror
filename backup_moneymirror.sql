-- MySQL dump 10.13  Distrib 9.4.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: moneymirror
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('cmg6mw1cx0000cd2vl2ya5o5d','Jean Dupont','jean@example.com','$2a$12$6As.3OgO0H2uoUEEAqwvcO7kLY.uu7ebIV1cJ2QZ/0jEiKuvQ59nW','2025-09-30 14:09:30.850','2025-09-30 14:09:30.850'),('cmg6ndvqn0001cd2vgtkj85a8','Test Hash','testhash@example.com','$2a$12$vtPz0KlgPzC0qib81NP/geZQaO.CtqNFrO/Hfp9W2OiYQeJyI1qJO','2025-09-30 14:23:23.376','2025-09-30 14:23:23.376'),('cmg6qca100002cd2vc15disso','Pierre Martin','pierre@example.com','$2a$12$Y5Ea5nt1SWTphEK7joWG7OLVl0Vj2KXNPZY5yxXELKlVweP/nQQLu','2025-09-30 15:46:07.429','2025-09-30 15:46:07.429'),('cmg6sbm660000mc1d59q9ginj','Test API','testapi@example.com','$2a$12$3nIiFup/c37S/QeFZNW5nuQf67N9Ap5HrNuX37WmEUztAmwXGMkjq','2025-09-30 16:41:35.743','2025-09-30 16:41:35.743'),('cmg9ytaof00001kxqsg2haqus','johnny','johhny@live.fr','$2a$12$i6pcuH4VjKySlyOhivhHaOalnM6KI7fYeK4Ud0bz7zFAKzImcE4sS','2025-10-02 22:06:36.879','2025-10-02 22:06:36.879'),('cmg9yucfp00011kxqaoia7l98','jo','jo@live.fr','$2a$12$0uEeGUui5cu6uuOl8s3dwuwdFwSsqQs82nGHcYq/sq5fE1eVCv4iy','2025-10-02 22:07:25.813','2025-10-02 22:07:25.813'),('cmg9yx70a00021kxqpxdhpiyo','testuser2025','test@moneymirror.com','$2a$12$kJWHaXs384EUagfwRqKn5OSiLzuHKMNmNRC6TXYc0mROR8rGznTaK','2025-10-02 22:09:38.747','2025-10-02 22:09:38.747'),('cmga0rjzc00008314boezekld','namy','emailej@live.fr','$2a$12$oMf5LYSx3XYxi0GtGDYRwuQaeNy2oSoN6gBZCBRkH6JwDJ5U.HHWy','2025-10-02 23:01:14.856','2025-10-02 23:01:14.856');
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

-- Dump completed on 2025-10-03 20:40:14
