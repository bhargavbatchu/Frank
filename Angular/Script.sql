IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'User')
BEGIN
	CREATE TABLE [dbo].[User]
	(
		[Id] [int] IDENTITY(1, 1) NOT NULL PRIMARY KEY,
		[Name] varchar(250) NULL,
		[Ip] varchar(250) NULL,
		CreatedOn DAtETime
	)
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Message')
BEGIN
	CREATE TABLE [dbo].[Message]
	(
		[Id] [int] IDENTITY(1, 1) NOT NULL PRIMARY KEY,
		[UserId] varchar(250) NULL,
		[Message] varchar(250) NULL,
		CreatedOn DAtETime
	)
END
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type='p' AND object_id = OBJECT_ID('[dbo].[AddUser]'))
BEGIN
	DROP PROCEDURE [dbo].[AddUser]
END
GO
 CREATE procedure [dbo].[AddUser]
(
	@Name VARCHAR(MAX),
	@Ip VARCHAR(MAX),
	@Id int out
)
as
begin

	insert into [dbo].[User](Name,Ip,CreatedOn) values (@Name,@Ip,GETUTCDATE())
	select cast(1 as bit) as IsSuccess
	--, 'user inserted successfully' as ResponseMessage

	set @Id = SCOPE_IDENTITY()
end
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type='p' AND object_id = OBJECT_ID('[dbo].[InsertMessage]'))
BEGIN
	DROP PROCEDURE [dbo].[InsertMessage]
END
GO
 CREATE procedure [dbo].[InsertMessage]
(
	@UserId VARCHAR(MAX),
	@Message VARCHAR(MAX)
)
as
begin

	insert into [dbo].[Message](UserId,Message,CreatedOn) values (@UserId,@Message,GETUTCDATE())
	select cast(1 as bit) as IsSuccess, 'msg inserted successfully' as ResponseMessage
	
end
GO

IF EXISTS(SELECT * FROM sys.objects WHERE type='p' AND object_id = OBJECT_ID('[dbo].[GetMessage]'))
BEGIN
	DROP PROCEDURE [dbo].[GetMessage]
END
GO
 CREATE procedure [dbo].[GetMessage]
as
begin

select Message,U.Name as Name from [dbo].[Message] MS
inner join  [dbo].[User] U on U.Id = MS.UserId
	
end
GO

select * from [dbo].[Message]

select * from  [dbo].[User]