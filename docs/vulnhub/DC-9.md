## Find IP Address of Machine
Let's find the IP address of the DC-9 machine
```
$ arp-scan --interface=eth1 10.10.10.0/24

Interface: eth1, type: EN10MB, MAC: 08:00:27:5a:bb:1d, IPv4: 10.10.10.106
Starting arp-scan 1.9.7 with 256 hosts (https://github.com/royhills/arp-scan)
10.10.10.1	0a:00:27:00:00:05	(Unknown: locally administered)
10.10.10.100	08:00:27:6d:d8:39	PCS Systemtechnik GmbH
10.10.10.109	08:00:27:2e:3b:e6	PCS Systemtechnik GmbH
```
The `arp-scan` reult shows the IP address of DC-9 machine as `10.10.10.109`
## Nmap Scan
Scan the default ports
```
root@kali:~# nmap -sV -sC -oA dc-9.output 10.10.10.109
Starting Nmap 7.80 ( https://nmap.org ) at 2020-06-16 06:59 EDT
Nmap scan report for 10.10.10.109
Host is up (0.00017s latency).
Not shown: 999 closed ports
PORT   STATE    SERVICE VERSION
22/tcp filtered ssh
MAC Address: 08:00:27:2E:3B:E6 (Oracle VirtualBox virtual NIC)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.00 seconds
```
Sleep for sometime and start the port scan for all the ports
```
root@kali:~# sleep 300; nmap -p- -oA dc-9-allports 10.10.10.109
```

