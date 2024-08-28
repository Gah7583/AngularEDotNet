CREATE DATABASE ConhecimentosEmSQL;
GO
USE ConhecimentosEmSQL;

DROP TABLE IF EXISTS Clientes;
CREATE TABLE Clientes(
	ClienteId uniqueidentifier NOT NULL PRIMARY KEY,
	Nome nvarchar(100) NOT NULL,
	Cpf char(11) NOT NULL,
	ClienteReferenciaId uniqueidentifier FOREIGN KEY REFERENCES Clientes(ClienteId),
	CONSTRAINT UQ_Clientes_Cpf UNIQUE (Cpf)
);

DROP TABLE IF EXISTS Enderecos;
CREATE TABLE Enderecos(
	EnderecoId uniqueidentifier PRIMARY KEY,
	ClienteId uniqueidentifier FOREIGN KEY REFERENCES Clientes (ClienteId),
	TipoEndereco tinyint NOT NULL,
	Logradouro nvarchar (150) NOT NULL,
	Cidade nvarchar (60) NOT NULL,
	Estado char (2) NOT NULL,
	CONSTRAINT CHK_Enderecos_TipoEndereco CHECK (TipoEndereco<4),
	CONSTRAINT UQ_Enderecos_ClienteId_TipoEndereco UNIQUE (ClienteId, TipoEndereco)
);

DROP TABLE IF EXISTS Produtos;
CREATE TABLE Produtos(
	ProdutoId uniqueidentifier PRIMARY KEY,
	Nome nvarchar (100) NOT NULL,
	Preco decimal (12,2) NOT NULL,
	Codigo char (20)  NOT NULL,
	CONSTRAINT UQ_Produtos_Codigo UNIQUE (Codigo)
);

DROP TABLE IF EXISTS Pedidos;
CREATE TABLE Pedidos(
	PedidoId uniqueidentifier PRIMARY KEY,
	DataPedido datetime NOT NULL,
	ClienteId uniqueidentifier FOREIGN KEY REFERENCES Clientes (ClienteId)
);

DROP TABLE IF EXISTS PedidoProduto;
CREATE TABLE PedidoProduto(
	PedidoId uniqueidentifier,
	ProdutoId uniqueidentifier,
	Quantidade decimal (10,4) NOT NULL,
	PrecoUnitario decimal (12,2) NOT NULL,
	CONSTRAINT PK_PedidoProduto_PedidoId_ProdutoId PRIMARY KEY(PedidoId, ProdutoId),
	FOREIGN KEY (PedidoId) REFERENCES Pedidos (PedidoId),
	FOREIGN KEY (ProdutoId)REFERENCES Produtos (ProdutoId)
);

DROP TABLE IF EXISTS Pagamentos;
CREATE TABLE Pagamentos(
	PagamentoId uniqueidentifier PRIMARY KEY,
	PedidoId uniqueidentifier NOT NULL FOREIGN KEY REFERENCES Pedidos (PedidoId),
	Valor decimal (12,2) NOT NULL,
	MetodoPagamento tinyint NOT NULL,
	PrecoUnitario decimal (12,2) NOT NULL,
	CONSTRAINT CHK_Pagamentos_MetodoPagamento CHECK (MetodoPagamento < 4)
);

BEGIN TRANSACTION

DECLARE @ClienteId UNIQUEIDENTIFIER = NEWID()
DECLARE @ProdutoId1 UNIQUEIDENTIFIER = NEWID()
DECLARE @ProdutoId2 UNIQUEIDENTIFIER = NEWID()
DECLARE @PedidoId UNIQUEIDENTIFIER = NEWID()

INSERT INTO Clientes (ClienteId, Nome, Cpf)
VALUES (@ClienteId, 'Luís Maurício', '12345678912')

INSERT INTO Enderecos (EnderecoId, ClienteId, TipoEndereco, Logradouro, Cidade, Estado)
VALUES (NEWID(), @ClienteId, 1, 'João Filipini', 'Barra Bonita', 'SP')

INSERT INTO Produtos (ProdutoId, Nome, Preco, Codigo)
VALUES (@ProdutoId1, 'Produto 1', 10.50, '12345678912345678912')

INSERT INTO Produtos (ProdutoId, Nome, Preco, Codigo)
VALUES (@ProdutoId2, 'Produto 2', 10, '12345678912345678913')

INSERT INTO Pedidos (PedidoId, DataPedido, ClienteId)
VALUES (@PedidoId, SYSDATETIME(), @ClienteId)

INSERT INTO PedidoProduto (PedidoId, ProdutoId, Quantidade, PrecoUnitario)
VALUES (@PedidoId, @ProdutoId1, 1002.5079, (SELECT Preco FROM Produtos WHERE ProdutoId = @ProdutoId1))

INSERT INTO PedidoProduto (PedidoId, ProdutoId, Quantidade, PrecoUnitario)
VALUES (@PedidoId, @ProdutoId2, 500, (SELECT Preco FROM Produtos WHERE ProdutoId = @ProdutoId2))

DECLARE @Valor decimal(12,2) = (SELECT SUM((Quantidade * PrecoUnitario)) FROM PedidoProduto WHERE @PedidoId = PedidoId)

INSERT INTO Pagamentos (PagamentoId, PedidoId, Valor, MetodoPagamento, PrecoUnitario)
VALUES (NEWID(), @PedidoId,
@Valor,
3,
4999.99)

COMMIT TRANSACTION