-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 29-Mar-2019 às 04:48
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `aviso`
--

CREATE TABLE `aviso` (
  `idAviso` int(255) NOT NULL,
  `dataAviso` date NOT NULL,
  `horaAviso` time NOT NULL,
  `tituloAviso` varchar(200) NOT NULL,
  `mensagem` text NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `campeonato`
--

CREATE TABLE `campeonato` (
  `idCampeonato` int(255) NOT NULL,
  `nomeCampeonato` varchar(100) NOT NULL,
  `descricaoCampeonato` text NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date NOT NULL,
  `encerraInscricoes` int(1) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `campeonato_time`
--

CREATE TABLE `campeonato_time` (
  `id` int(255) NOT NULL,
  `idCampeonato` int(255) NOT NULL,
  `idTime` int(255) NOT NULL
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
  `idTime1` int(255) NOT NULL,
  `idTime2` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `time`
--

CREATE TABLE `time` (
  `idTime` int(255) NOT NULL,
  `nomeTime` varchar(250) NOT NULL
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
  `desativaUser` int(1) NOT NULL,
  `foto_perfil` longblob NOT NULL,
  `permissao` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_campeonato`
--

CREATE TABLE `usuario_campeonato` (
  `id` int(255) NOT NULL,
  `iduser` int(11) NOT NULL,
  `idCampeonato` int(11) NOT NULL,
  `jogando` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_partida`
--

CREATE TABLE `usuario_partida` (
  `id_user_partida` int(255) NOT NULL,
  `idUser` int(255) NOT NULL,
  `idPartida` int(255) NOT NULL,
  `idTime` int(255) NOT NULL,
  `nomeUser` varchar(250) NOT NULL,
  `foto` longblob NOT NULL,
  `cartaoAmarelo` int(11) NOT NULL,
  `cartaoVermelho` int(11) NOT NULL,
  `gols` int(11) NOT NULL,
  `contra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_time`
--

CREATE TABLE `usuario_time` (
  `id` int(255) NOT NULL,
  `idUser` int(255) NOT NULL,
  `idTime` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aviso`
--
ALTER TABLE `aviso`
  ADD PRIMARY KEY (`idAviso`);

--
-- Indexes for table `campeonato`
--
ALTER TABLE `campeonato`
  ADD PRIMARY KEY (`idCampeonato`);

--
-- Indexes for table `campeonato_time`
--
ALTER TABLE `campeonato_time`
  ADD PRIMARY KEY (`id`),
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
  ADD PRIMARY KEY (`idTime`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `usuario_campeonato`
--
ALTER TABLE `usuario_campeonato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`iduser`),
  ADD KEY `id_Campeonato` (`idCampeonato`);

--
-- Indexes for table `usuario_partida`
--
ALTER TABLE `usuario_partida`
  ADD PRIMARY KEY (`id_user_partida`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idPartida` (`idPartida`),
  ADD KEY `idTime` (`idTime`);

--
-- Indexes for table `usuario_time`
--
ALTER TABLE `usuario_time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`idUser`),
  ADD KEY `id_time` (`idTime`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aviso`
--
ALTER TABLE `aviso`
  MODIFY `idAviso` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campeonato`
--
ALTER TABLE `campeonato`
  MODIFY `idCampeonato` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campeonato_time`
--
ALTER TABLE `campeonato_time`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

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
  MODIFY `idUser` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario_campeonato`
--
ALTER TABLE `usuario_campeonato`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario_partida`
--
ALTER TABLE `usuario_partida`
  MODIFY `id_user_partida` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario_time`
--
ALTER TABLE `usuario_time`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `campeonato_time`
--
ALTER TABLE `campeonato_time`
  ADD CONSTRAINT `fk_idCampeonato` FOREIGN KEY (`idCampeonato`) REFERENCES `campeonato` (`idCampeonato`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idTime` FOREIGN KEY (`idTime`) REFERENCES `time` (`idTime`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `idCampeonato_fk` FOREIGN KEY (`id_Campeonato`) REFERENCES `campeonato` (`idCampeonato`);

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
  ADD CONSTRAINT `idTime_FK` FOREIGN KEY (`idTime`) REFERENCES `time` (`idTime`),
  ADD CONSTRAINT `idUser_FK` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `usuario_time`
--
ALTER TABLE `usuario_time`
  ADD CONSTRAINT `id_time_fk` FOREIGN KEY (`idTime`) REFERENCES `time` (`idTime`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_usuario_fk` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
