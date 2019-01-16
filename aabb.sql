-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 14-Jan-2019 às 13:02
-- Versão do servidor: 10.1.35-MariaDB
-- versão do PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aabb`
--
CREATE DATABASE IF NOT EXISTS `aabb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `aabb`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `campeonato`
--

CREATE TABLE `campeonato` (
  `idCampeonato` int(255) NOT NULL,
  `nomeCampeonato` varchar(100) NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `campeonato`
--

INSERT INTO `campeonato` (`idCampeonato`, `nomeCampeonato`, `dataInicio`, `dataFim`, `status`) VALUES
(1, 'Liga da AABB', '2019-01-19', '2019-01-22', 0),
(2, 'Beneficente', '2019-02-20', '2019-02-22', 0),
(3, 'Liga dos Campeões', '2019-01-17', '2019-01-20', 0),
(4, 'Teste', '2019-02-17', '2019-02-18', -1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `campeonato_time`
--

CREATE TABLE `campeonato_time` (
  `idCampeonato` int(255) NOT NULL,
  `idTime` int(255) NOT NULL,
  `vitorias` int(255) NOT NULL,
  `derrotas` int(255) NOT NULL,
  `empates` int(255) NOT NULL,
  `gols` int(255) NOT NULL,
  `golsContra` int(255) NOT NULL,
  `cartaoAmarelo` int(255) NOT NULL,
  `cartaoVermelho` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `partida`
--

CREATE TABLE `partida` (
  `idPartida` int(255) NOT NULL,
  `id_Campeonato` int(255) NOT NULL,
  `descricaoPart` varchar(250) NOT NULL,
  `dataPartida` date NOT NULL,
  `horaPartida` time NOT NULL,
  `gol1` int(11) NOT NULL,
  `gol2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `time`
--

CREATE TABLE `time` (
  `idTime` int(255) NOT NULL,
  `nomeTime` varchar(250) NOT NULL,
  `idUser` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUser` int(255) NOT NULL,
  `nomeUser` varchar(250) NOT NULL,
  `enderecoUser` text NOT NULL,
  `nivelUser` int(14) NOT NULL,
  `emailUser` varchar(150) NOT NULL,
  `senhaUser` varchar(50) NOT NULL,
  `telefoneUser` varchar(20) NOT NULL,
  `desativaUser` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUser`, `nomeUser`, `enderecoUser`, `nivelUser`, `emailUser`, `senhaUser`, `telefoneUser`, `desativaUser`) VALUES
(1, 'Administrador', 'AABB Palmas', 1, 'aabb@adm', 'aabb123', '123', 0),
(2, 'Caio Henrique de Sousa', '406 Norte Al 9, QI 5', 3, 'sousa.chs95@gmail.com', '123', '6332146451', 0),
(3, 'Marcos Mateus de Sousa', '406 Norte Al 9', 0, 'mateus@gmail.com', '123', '63984122233', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_campeonato`
--

CREATE TABLE `usuario_campeonato` (
  `iduser` int(11) NOT NULL,
  `idCampeonato` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario_campeonato`
--

INSERT INTO `usuario_campeonato` (`iduser`, `idCampeonato`) VALUES
(2, 1),
(3, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_partida`
--

CREATE TABLE `usuario_partida` (
  `idUser` int(255) NOT NULL,
  `idPartida` int(255) NOT NULL,
  `cartaoAmarelo` int(11) NOT NULL,
  `cartaoVermelho` int(11) NOT NULL,
  `gols` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campeonato`
--
ALTER TABLE `campeonato`
  ADD PRIMARY KEY (`idCampeonato`);

--
-- Indexes for table `campeonato_time`
--
ALTER TABLE `campeonato_time`
  ADD KEY `idCampeonato` (`idCampeonato`),
  ADD KEY `idTime` (`idTime`);

--
-- Indexes for table `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`idPartida`),
  ADD KEY `id_Campeonato` (`id_Campeonato`);

--
-- Indexes for table `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`idTime`),
  ADD KEY `idJogador` (`idUser`) USING BTREE;

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `usuario_campeonato`
--
ALTER TABLE `usuario_campeonato`
  ADD KEY `id_usuario` (`iduser`),
  ADD KEY `id_Campeonato` (`idCampeonato`);

--
-- Indexes for table `usuario_partida`
--
ALTER TABLE `usuario_partida`
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idPartida` (`idPartida`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campeonato`
--
ALTER TABLE `campeonato`
  MODIFY `idCampeonato` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `partida`
--
ALTER TABLE `partida`
  MODIFY `idPartida` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `idTime` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUser` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `campeonato_time`
--
ALTER TABLE `campeonato_time`
  ADD CONSTRAINT `idCampeonato_fk` FOREIGN KEY (`idCampeonato`) REFERENCES `campeonato` (`idCampeonato`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idTime_fk` FOREIGN KEY (`idTime`) REFERENCES `time` (`idTime`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `campeonato_id_fk` FOREIGN KEY (`id_Campeonato`) REFERENCES `campeonato` (`idCampeonato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `time`
--
ALTER TABLE `time`
  ADD CONSTRAINT `idJogador_fk` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `usuario_campeonato`
--
ALTER TABLE `usuario_campeonato`
  ADD CONSTRAINT `id_campeonato_fk` FOREIGN KEY (`idCampeonato`) REFERENCES `campeonato` (`idCampeonato`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_user_fk` FOREIGN KEY (`iduser`) REFERENCES `usuario` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `usuario_partida`
--
ALTER TABLE `usuario_partida`
  ADD CONSTRAINT `idPartida_fk` FOREIGN KEY (`idPartida`) REFERENCES `partida` (`idPartida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idUser_fk` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
