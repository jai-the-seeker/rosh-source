* [Scans](#scans)
  * [Basic Scans](#basic-scans)
* [scripts](#scripts)
  * [brute](#brute)
    * [http-proxy-brute](#http-proxy-brute)
  * [discovery](#discovery)
    * [banner](#banner)
# scans
## basic scans
```sh
# version of the running services
# -sV: Probe open ports to determine service/version info
# -sC: equivalent to --script=default
nmap -sV -sC 192.165.34.3

# Alternatively
nmap -A 192.165.34.3
```
# scripts
## brute
### http-proxy-brute
The http-brute script uses, by default, the database files `usernames.lst` and `passwords.lst` located at `/nselib/data/` to try each password, for every user
```sh
nmap --script http-proxy-brute -p3128 192.144.18.3
```
To use different username and password lists, set the arguments `userdb` and `passdb` : 
```sh
nmap --script http-proxy-brute -p3128 192.144.18.3 --script-args userdb=usernames.lst,passdb=passwords.lst
```
## discovery
### banner
```sh
# nmap -sV --script=banner <target>
nmap -sV --script=banner -p- 192.162.110.3
```
