-- Check if the database 'store' exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'store')
BEGIN
    -- If the database does not exist, create it
    CREATE DATABASE store;
    PRINT 'Database "store" created.';
END
ELSE
BEGIN
    PRINT 'Database "store" already exists.';
END
GO

-- Use the 'store' database
USE store;
GO

-- Check if the table 'm_staff' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'm_staff')
BEGIN
    -- If the table does not exist, create it
    CREATE TABLE m_staff (
        id nvarchar(100),
        username varchar(100),
        password varchar(100),
        name varchar(100),
        role int,
        deleted_at datetime,
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "m_staff" created.';
END
ELSE
BEGIN
    PRINT 'Table "m_staff" already exists.';
END
GO

-- Check if the table 'm_token' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'm_token')
BEGIN
    CREATE TABLE m_token (
        id nvarchar(100),
        staff_id varchar(100),
        access_token varchar(200),
        refresh_token varchar(200),
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "m_token" created.';
END
ELSE
BEGIN
    PRINT 'Table "m_token" already exists.';
END
GO

-- Check if the table 'm_product' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'm_product')
BEGIN
    CREATE TABLE m_product (
        id nvarchar(100),
        product_code varchar(100),
        name varchar(100),
        price int,
        discount_rate int,
        unit varchar(100),
        note varchar(100),
        manufacturer_id varchar(100),
        category_id varchar(100),
        image_path varchar(100),
        is_best_seller bit,
        remain_quantity int,
        deleted_at datetime,
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "m_product" created.';
END
ELSE
BEGIN
    PRINT 'Table "m_product" already exists.';
END
GO

-- Check if the table 'm_category' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'm_category')
BEGIN
    CREATE TABLE m_category (
        id nvarchar(100),
        name varchar(100),
        deleted_at datetime,
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "m_category" created.';
END
ELSE
BEGIN
    PRINT 'Table "m_category" already exists.';
END
GO

-- Check if the table 'm_customer' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'm_customer')
BEGIN
    CREATE TABLE m_customer (
        id nvarchar(100),
        name varchar(100),
        address varchar(100),
        phonenumber varchar(20),
        email varchar(100),
        TIN varchar(100),
        deleted_at datetime,
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "m_customer" created.';
END
ELSE
BEGIN
    PRINT 'Table "m_customer" already exists.';
END
GO

-- Check if the table 't_order' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 't_order')
BEGIN
    CREATE TABLE t_order (
        id nvarchar(100),
        customer_id varchar(100),
        total_price int,
        staff_id varchar(100),
        phonenumber varchar(20),
        deleted_at datetime,
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "t_order" created.';
END
ELSE
BEGIN
    PRINT 'Table "t_order" already exists.';
END
GO

-- Check if the table 't_orderDetail' exists
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 't_orderDetail')
BEGIN
    CREATE TABLE t_orderDetail (
        id nvarchar(100),
        order_id varchar(100),
        product_id varchar(100),
        quantity int,
        price int,
        deleted_at datetime,
        created_at datetime,
        updated_at datetime
    );
    PRINT 'Table "t_orderDetail" created.';
END
ELSE
BEGIN
    PRINT 'Table "t_orderDetail" already exists.';
END
GO
