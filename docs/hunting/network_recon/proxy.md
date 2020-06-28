---
title: Proxy
sidebar_label: Proxy
---

* [Proxy](#proxy)
  * [Proxy Authentication](#proxy-authentication)
    * [Open Authentication](#open-authentication)
    * [username and password](#username-and-password)
    * [bruteforce](#bruteforce)
  * [Proxychains](#proxychains)
    * [Configure proxychain](#configure-proxychain)
    * [Proxychain with `nmap`](#proxychain-with-nmap)
    * [Proxychain with `curl`](#proxychain-with-curl)

# Proxy
## Proxy Authentication
### Open Authentication
If the proxy is configured with authentication, any attempts made via proxy will return an `access denied` error. In case the proxy is configured without authentication, the connection will be forwarded by the proxy and the error message will be different than `Access denied` error.

By using the command `curl -x 192.201.208.3:3128 127.0.0.1`. We are looking for a different error message than `Access Denied`. Provided the proxy does not use any authentication, in case if a service is running, (for e.g an apache server) an HTTP response will be received, if no service is running then the connection refused error will be received. Either of the error will confirm that the proxy is configured without authentication. The following example shows that squid proxy is configured without authentication.
```sh
$ curl -i -x 192.234.192.3:3128 127.0.0.1

HTTP/1.1 503 Service Unavailable
Server: squid/3.5.12
...
X-Squid-Error: ERR_CONNECT_FAIL 111
Vary: Accept-Language
Content-Language: en
X-Cache: MISS from victim-1
X-Cache-Lookup: MISS from victim-1:3128
Via: 1.1 victim-1 (squid/3.5.12)
Connection: keep-alive

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
<meta type="copyright" content="Copyright (C) 1996-2015 The Squid Software Foundation and contributors">
<meta http-equiv="Content-Type" CONTENT="text/html; charset=utf-8">
<title>ERROR: The requested URL could not be retrieved</title>
<style type="text/css"><!-- 
...
.
<blockquote id="error">
<p><b>Connection to 127.0.0.1 failed.</b></p>
</blockquote>
...
```
### username and password
<https://github.com/jai-the-seeker/CTF-OSCP/blob/master/utilities/curl.md#username-and-password-for-proxy>
### bruteforce
#### nmap
<https://github.com/jai-the-seeker/CTF-OSCP/blob/master/utilities/nmap.md#http-proxy-brute>
#### bash script
<https://github.com/jai-the-seeker/CTF-OSCP/blob/master/scripts/bash_scripts.md#proxy-authentication-dictionary-attk>
## Proxychains

Proxychains is a tool which forces the TCP connection to go through the configured proxy(s). Proxychians can force the connection through multiple proxy servers. For e.g, if you have the following proxychains configuration (with strict chain option):

- socks5 192.200.34.4
- socks5 192.200.33.5
- socks4 192.200.32.6

The TCP connection will be sent through proxy servers in the following order.

> Host  <---> 192.200.34.4  <--->192.200.33.5 <---> 192.200.32.6 <---> Target

If any of the proxy servers fails to connect, the TCP connection won't be established. To skip a dead proxy server and move on to the next proxy server *Dynamic chain* option is used.

The *random chain* option is used to randomly select the order of the proxy server for forwarding the TCP connection.

Upon starting a program, for e.g Mozilla Firefox with the command: `proxychains firefox`, All the TCP traffic of Mozilla Firefox will be forced through the proxy server.

### Configure proxychain
```sh
cat /etc/proxychains.conf

# Add details of http proxy at the end of the file
http 192.234.192.3 3128
```
### Proxychain with `nmap`
We can use proxychain, to scan the target machine, we are forcing the traffic of `nmap` to go through the HTTP Proxy server.


* Since, we have configured `http` proxy, we need to use `-sT` flag with `nmap`.
```sh
proxychains nmap -sV -sT -p- 127.0.0.1
```
Please note: nmap also has an `--proxies` option. But it is not used as it does not work as expected, On the Nmap documentation (https://nmap.org/book/man-bypass-firewalls-ids.html), it is mentioned that the feature is till under development and has limitations.

### Proxychain with `curl`
```sh
curl -x 192.201.208.3:3128 127.0.0.1:1337

# The above command is same as
proxychains curl 127.0.0.1:1337
```

