# Untitled

## 

[Discover IPs]()

[arp-scan]()

[nmap ping scan]()

[Msfconsole scan]()

[nmap]()

[Basic Scan]()

[Slower Scan All Ports]()

[Faster Strategy for Scanning]()

[Alternative to -A]()

[Ping Scan]()

[UDP Scan]()

[Bash Script]()

[Using nmap to scan from list of IPs]()

[NSE Scripts]()

[Bruteforce]()

[http-proxy-brute]()

[Discovery]()

[Banner Grabbing]()

[Vulnerabilities]()

[All]()

[SMB]()

## Discover IPs

### arp-scan

kali@kali:~$ sudo arp-scan --interface=eth1 10.10.10.0/24

### [nmap ping scan]()

## Msfconsole scan

msf5 &gt; search portscan

msf5 &gt; use 4

msf5 auxiliary\(scanner/portscan/syn\) &gt; set rhosts 10.0.2.6

msf5 auxiliary\(scanner/portscan/syn\) &gt; run

## **nmap**

### Basic Scan

#### Slower Scan All Ports

\# Scan all ports

\# -A : Include everything

\# -p- : Scan all ports.

\# -T4 : Timing. T1 is the slowest and T5 is the fastest.

nmap -p- -A -T4 192.165.34.3

#### Faster Strategy for Scanning

\# Alternative strategy to save time

\# Do -p- scan first followed by -A scan only for specific ports that have been identified in the previous step.

\# Step 1:

nmap -p- -T4 192.165.34.3

\#Step 2:

nmap -p 22,80,443 -A -T4 192.165.34.3

#### Alternative to -A

\# -sS : Stealth scan. Also called as SYN scan. How it works is nmap

\# sends the SYN request to the remote host, when it responds by

\# SYNACK, the nmap does not establish the connection, instead

\# responds back by sending RST.

\# -sV: Probe open ports to determine service/version info

\# -sC: equivalent to --script=default

\# without -p option nmap will scan most common 1000 ports

nmap -sS -sV -sC 192.165.34.3

### Ping Scan

kali@kali:~$ nmap -sn 10.0.2.0/24

### UDP Scan

nmap -sU -T4 192.165.34.3

\# Note : We do not use -p- and -A options here, as it takes a lot of

\# time. Instead we use -p, which scans for most common 1000 ports.

### Bash Script

#### [Using nmap to scan from list of IPs](https://docs.google.com/document/u/0/d/1mN2ZC-Tfyr0ap9d3qbq0uiJ41ku6o4ZatDJ4A-ozQq0/edit)

### NSE Scripts

#### Bruteforce

**http-proxy-brute**

The http-brute script uses, by default, the database files \`usernames.lst\` and \`passwords.lst\` located at \`/nselib/data/\` to try each password, for every user

\`\`\`sh

nmap --script http-proxy-brute -p3128 192.144.18.3

\`\`\`

To use different username and password lists, set the arguments \`userdb\` and \`passdb\` :

\`\`\`sh

nmap --script http-proxy-brute -p3128 192.144.18.3 --script-args userdb=usernames.lst,passdb=passwords.lst

\`\`\`

#### Discovery

**Banner Grabbing**

\# nmap -sV --script=banner &lt;target&gt;

nmap -sV --script=banner -p- 192.162.110.3

#### Vulnerabilities

**All**

\#To find all vulnerabilities

nmap --script vuln 10.10.10.118

**SMB**

SMB is used for communication between heterogeneous machines.

\# Look for SMB scripts available in nmap scripts folder

cd /usr/share/nmap/scripts

ls \| grep smb

\# We may find some scripts for SMB in the nmap folder. Let us use one of the scripts to find if a remote host is vulnerable to this machine.

\#smb-vuln-ms17-010.nse

nmap --script smb-vuln-ms17-010192.168.98.130

### 

