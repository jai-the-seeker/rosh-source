* [LFI](#lfi)
  * [Fuzz URI parameters](#fuzz-uri-parameters)
  * [Check for LFI](#Check-for-lfi)

# LFI
Refs:
* <https://www.acunetix.com/blog/articles/local-file-inclusion-lfi/>
## Fuzz URI parameters
* <https://github.com/jai-the-seeker/CTF-OSCP/blob/master/web/web_recon.md#fuzzing-parameter-for-lfi>
## Check for LFI
Refs
* <https://www.exploit-db.com/papers/12886>
* <http://www.securityidiots.com/Web-Pentest/LFI/guide-to-lfi.html>
* <https://highon.coffee/blog/lfi-cheat-sheet/>
### Step 1: Directory Traversal
In burpsuite, send the intercepted request to repeater mode. Then temper with the arguments of the parameter, to find the LFI vulnerability. In case the vulnerability exists, the contents of `/etc/passwd`, will show up in the response. In case, there are no parameters being supplied to the URI, the same can be found by fuzzing. In the example below, the parameter `file` has been found out through fuzzing URI parameters.
```
GET /manage.php?file=../../../../../../../../../../../etc/passwd HTTP/1.1
```

