---
title: Laravel 创建数据库遇到的问题 Illuminate\Database\QueryException_could not find driver
date: 2022-03-06 14:58:36
tags: [PHP, Laravel, SQL]
categories: [Coding, PHP]
---

### 前言
`Laravel` 创建数据库遇到的问题：`Illuminate\\Database\\QueryException_could not find driver (SQL: select \* from)`

### 执行以下命令

`php artisan migrate`

### 报以下错误
```powershell
E:\PhpStorm_Project\learn-laravel>php artisan migrate

   Illuminate\Database\QueryException  : could not find driver (SQL: select * from information_schema.tables where table_schema = laravel and table_name = migrations and table_typ

e = 'BASE TABLE')

  at E:\PhpStorm_Project\learn-laravel\vendor\laravel\framework\src\Illuminate\Database\Connection.php:669

    665|         // If an exception occurs when attempting to run a query, we'll format the error

    666|         // message to include the bindings with SQL, which will make this exception a

    667|         // lot more helpful to the developer instead of just the database's errors.

    668|         catch (Exception $e) {

  > 669|             throw new QueryException(

    670|                 $query, $this->prepareBindings($bindings), $e

    671|             );

    672|         }

    673| 

  Exception trace:

  1   PDOException::("could not find driver")

      E:\PhpStorm_Project\learn-laravel\vendor\laravel\framework\src\Illuminate\Database\Connectors\Connector.php:70

  2   PDO::__construct()

      E:\PhpStorm_Project\learn-laravel\vendor\laravel\framework\src\Illuminate\Database\Connectors\Connector.php:70

  Please use the argument -v to see more details.
```
### 原因： 
1. 你可能配置根目录下的 `.env` 文件，你应该像我这样配置
 ```json
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel
 ```
2. 未启用 `pdo\_mysql` 扩展 
   1. Linux：在 `php.ini` 文件加入这一行 `extension=pdo\_mysql.so`
   2. Windows：在 `php.ini` 文件加入这一行 `extension=pdo\_mysql.dll`
