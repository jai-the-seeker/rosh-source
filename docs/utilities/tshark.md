# Basic Commands
```sh
# -D : print list of interfaces and exit
tshark -D

# -i <interface> name or idx of interface
tshark -i eth0

# Input file:
#  -r <infile> set the filename to read from (- to read from stdin)
tshark -r HTTP_traffic.pcap
```
# Display Filters
Refs:
* <https://tshark.dev/analyze/packet_hunting/packet_hunting/>
```sh
# Command to show only the HTTP traffic from a PCAP file
tshark -Y 'http' -r HTTP_traffic.pcap

# Command to show only the IP packets sent from IP address 192.168.252.128 to IP
# address 52.32.74.91?
tshark -r HTTP_traffic.pcap -Y 'ip.src==192.168.252.128 && ip.dst==52.32.74.91'
```
## WiFi Filters
```sh
# Command to display WPA handshake packets?
tshark -r WiFi_traffic.pcap -Y 'eapol'
```

# Statistics

`-z io,phs[,filter]`

Create Protocol Hierarchy Statistics listing both number of packets and bytes. If no filter is specified the statistics will be calculated for all packets. If a filter is specified statistics will only be calculated for those packets that match the filter.

```
tshark -r HTTP_traffic.pcap -z io,phs -q
```

Refs:
* <https://www.wireshark.org/docs/man-pages/tshark.html>
