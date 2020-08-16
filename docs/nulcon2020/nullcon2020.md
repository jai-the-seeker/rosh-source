# NullCon 2020

change prompt
```
export PS1="\e[31mNullcon$\e[m"
```
Scan the complete network
```
arp-scan 192.168.3.0/24 | tee arp_scan_3_0.txt; arp-scan 192.168.X.0/24 | tee arp_scan_70_0.txt
```
