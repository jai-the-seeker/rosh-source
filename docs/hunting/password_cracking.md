---
title: Password Cracking
sidebar_label: Password Cracking
---
* [`hash-identifier`](#hash-identifier)
* [hash online websites](#hash-online-websites)
* [Hashcat](#hashcat)
  * [example hashes](#example-hashes)
  * [show delete found password](#show-delete-found-password)
  * [Mask Based Attack](#mask-based-attack)
    * [Setup Mask](#setup-mask)
    * [Increment Mode](#increment-mode)
    * [Hashcat Mask Files](#hashcat-mask-files)
  * [Dictionary Attack](#dictionary-attack)
  * [MD5](#md5)
  * [HMAC](#hmac)
  * [CRC32](#crc32)
  * [SHA1](#sha1)
  * [NTLM](#ntlm)
  * [MD5Crypt](#md5Crypt)
  * [Bcrypt](#bcrypt)  
* [Wordlists](#wordlists)
* [john the ripper](#john-the-ripper)
* [Protected Files](#protected-files)
  * [RAR](#rar)
  * [PKZIP](#pkzip)
  * [MS word .docx](#ms-word-docx)
  * [MS word .doc](#ms-word-doc)


# `hash-identifier`
* <https://tools.kali.org/password-attacks/hash-identifier>
```
hash-identifier
```
* Any hash with `32` characters is `MD5`
```sh
echo -n 8743b52063cd84097a65d1633f5c74f5 | wc -c
32
```

# hash online websites
* <https://hashes.org/search.php>
* <https://hashes.com/en/decrypt/hash>
## findmyhash
* <https://tools.kali.org/password-attacks/findmyhash>

Specifying the hash algorithm `MD5`, attempt to crack the given hash `-h 098f6bcd4621d373cade4e832627b4f6`:
```
root@kali:~# findmyhash MD5 -h 098f6bcd4621d373cade4e832627b4f6
```
# Hashcat
## example hashes
* <https://hashcat.net/wiki/doku.php?id=example_hashes>
## show delete found password
To show an existing cracked password use `--show` flag in the end like
```sh
hashcat -m 0 -a 0 digest.txt /usr/share/wordlists/rockyou.txt --force --show
```

You can disable potfile support completely by using `--potfile-disable`
```sh
# find hashcat.potfile
find / -type f -name 'hashcat.potfile'

# -n tells echo not to output the trailing newline
echo -n "" > /hashcat/hashcat-4.2.1/hashcat.potfile
```
## Mask Based Attack
### Setup Mask
Refs
* <https://hashcat.net/wiki/doku.php?id=mask_attack>
* <https://www.4armed.com/blog/perform-mask-attack-hashcat/>
```sh
command: -a 3 -1 ?l?d ?1?1?1?1?1
keyspace: aaaaa - 99999
```
```sh
# password length is 5 characters
# password can only contain characters from this character set:  a-z, 0-9
hashcat -m 0 -a 3 digest.txt -1 ?l?d ?1?1?1?1?1
```
### Increment Mode
```sh
# If you take the mask “?l?l?l?l?l?l?l” it will only try passwords of that length. To cycle through all the possible combinations from 
# one to seven, the “--increment argument” can be used.
?l
?l?l
?l?l?l
?l?l?l?l
?l?l?l?l?l
?l?l?l?l?l?l?l
```
In order to limit the increment within a specified range use `--increment-min` and `increment-max` options
### Hashcat Mask Files
Let us consider the following scenario for creating a password masking attack:

* Length between five and eight characters
* Always starts with a capital letter
* Always ends with a number
* The characters in the middle are either lower or upper case

For a single entry in a mask file, the following structure is used:
```
charset1,charset2,charset3,charset4,mask
```
It's important to highlight that the charset parameters are optional. So it's possible to create entries in the following format:
```
charset1,charset2,charset3,charset4,mask
charset1,charset2,mask
mask
```
To meet the previous scenario, we can create a mask file containing the following:
```
?u,?u?l,?d,?1?2?2?2?3
?u,?u?l,?d,?1?2?2?2?2?3
?u,?u?l,?d,?1?2?2?2?2?2?3
```
Mask files have the file extension of `.hcmask` and can be used from the command line like below:
```sh 
hashcat -m 0 -a 3 hash masks.hcmask
```
## Dictionary Attack
Refs:
* <https://null-byte.wonderhowto.com/how-to/hack-like-pro-crack-passwords-part-3-using-hashcat-0156543/>
```sh
hashcat -m 1800 -a 0 hash.lst wordlist.txt
```
`-m` 1800 designates the type of hash we are cracking (SHA-512)

`-a 0` designates a dictionary attack

`hash.lst` is our input file of hashes

`wordlist.txt` is the absolute path to our wordlist for this dictionary attack
## MD5
* Any hash with `32` characters is `MD5`
```sh
echo -n 8743b52063cd84097a65d1633f5c74f5 | wc -c
32
```

```sh
# -m 0 : MD5 without salt

# MD5 hash:salt 
# cf0b18ddb1a31d05fc73f50fcd29e0a8:salt123
hashcat -m 10 -a 0 digest.txt password-seclists.txt
```
## HMAC
HMAC is a keyed hash (authenticated hash) scheme which ensures that a specific hash value can only be generated if the entity possess a secret key. This scheme can be used to turn any existing hash function into an authenticated hash function which can be then used to check the authenticity of the message in addition to its integrity. HMAC-SHA1 was widely used in online banking security, HTTPS, VPN connections in addition to verify the integrity of the files/binaries. In essence, it is mostly used to protect the data in transit over insecure mediums. 

A plain-text string and corresponding HMAC-SHA1 digest is provided in digest.txt file. The key used to generate the HMAC-SHA1 is either taken from a key dictionary or by using the key policy. The `digest.txt` file and the dictionary file `password-seclists.txt` is present in the user's home directory.

Objective: Recover the secret key.

`150	HMAC-SHA1 (key = $pass)	c898896f3f70f61bc3fb19bef222aa860e5ea717:1234` from [example hashes](https://hashcat.net/wiki/doku.php?id=example_hashes)
```sh
# 
# hash:plaintext
# 69f7e54d484620ed6e9d731ca51780a000463fc2:tinkerbell97
hashcat -m 150 -a 0 digest.txt password-seclists.txt
```
## CRC32
`11500	CRC32 5	c762de4a:00000000` from [example hashes](https://hashcat.net/wiki/doku.php?id=example_hashes)
```sh
hashcat -m 11500 -a 0 digest.txt password-seclists.txt
```
## SHA1
```sh
hashcat -m 100 digest.txt -a 0 password-seclists.txt
```
## NTLM
```sh
hashcat -m 1000 -a 0 digest.txt password-seclists.txt
```
## MD5Crypt
```sh
hashcat -m 500 digest.txt -a 0 1000000-password-seclists.txt
```
## Bcrypt
`Bcrypt` is a popular 184-bit password hashing function designed by Niels Provos and David Mazières in 1999. It is based on `blowfish` cipher.  It is default password hashing algorithm for OpenBSD and other OSes like SUSE Linux.
```sh
$ cat digest.txt
Digest: gLX3.eb.sPNURq3Y87bx/eUC9Ysw6mZhi1HAWvy07DWYyw9zYI3.W
Rounds: 4
```
This input format is not compatible to Hashcat. So, modify it
```sh
$ cat digest.txt
$2a$04$gLX3.eb.sPNURq3Y87bx/eUC9Ysw6mZhi1HAWvy07DWYyw9zYI3.W

hashcat -m 3200 -a 0 digest.txt password-seclists.txt
```

# Wordlists
## Generate a custom wordlist
`CeWL` is a ruby app which spiders a given url to a specified depth, optionally following external links, and returns a list of words which can then be used for password crackers such as John the Ripper.
Refer : <https://tools.kali.org/password-attacks/cewl>
```sh
cewl -w createWordlist.txt -m <min password length> https://www.example.com
```
Scan to a depth of 2 `-d 2` and use a minimum word length of 5 `-m 5`, save the words to a file `-w docswords.txt`, targeting the given URL (https://example.com):
```sh
cewl -d 2 -m 5 -w docswords.txt https://example.com
```
# john the ripper
John HASH cracking using dictionary
```sh
john --wordlist=/user/share/wordlists/rockyou.txt hash.txt
```
```
MD5
$ john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

SHA1
$ john --format=raw-sha1 hashes.txt

SHA224
$ john --format=raw-sha224 hashes.txt

SHA512
$ john --format=raw-sha512 hashes.txt
```
Other hash formats supported by John the Ripper: http://pentestmonkey.net/cheat-sheet/john-the-ripper-hash-formats

## john pot file
### How to clear crakced hash from database
As you can see in the docs http://www.openwall.com/john/doc/, John (and almost any good hash cracker) will store the 
cracked hashes in some sort of file/db.
This is for performance, this programs will check for already cracked hashes preventing them to spend cpu/gpu time.
In the case of John, is located at: `$JOHN/john.pot` (`$JOHN` path depends on the install). You can view the previously 
cracked hashes in the terminal with the command: `john --show passwd`
# Protected Files
## RAR
```sh
# extract hashes of .rar file
rar2john archive.rar > hash

cat hash
$rar5$16$50d889a2c6441510dd0c8ab76dde4fd6$15$697757daca178f6f88135491827bdad6$8$e13f0c4d2f8286d5

john --wordlist=password-seclists.txt hash
hashcat -m 13000 hash -a 0 password-seclists.txt
```
## PKZIP
We have to use JTR because at the time of writing this document, PKZIP is not supported by hashcat
```sh
# extract hashes of .zip file
zip2john archive.zip > hash

cat hash
archive.zip:$pkzip2$1*2*2*0*2d*21*c10509e*0*3f*0*2d*0c10*360a*f5e92c2b27b0f6ece97e6030ccb3338eb42b7c5ec117f4b49bfb0232e1e45e1673c6ef2fb8c952ba2410a770aa*$/pkzip2$:::::archive.zip

john --wordlist=1000000-password-seclists.txt hash
```
## MS word .docx
MS Office 2013
```sh
# extract hashes of .docx file
office2john MS_Word_Document.docx > hash

$ cat hash
MS_Word_Document.docx:$office$*2013*100000*256*16*ff2563844faca58a12fc42c5036f9cf8*ffaf52db903dbcb6ac2db4bab6d343ab*c237403ec97e5f68b7be3324a8633c9ff95e0bb44b1efcf798c70271a54336a2

john --wordlist=password-seclists.txt hash
```
Using Hashcat
```sh
# Make the hashes compatible with hashcat
cat hash
$office$*2013*100000*256*16*ff2563844faca58a12fc42c5036f9cf8*ffaf52db903dbcb6ac2db4bab6d343ab*c237403ec97e5f68b7be3324a8633c9ff95e0bb44b1efcf798c70271a54336a2

hashcat -m 9600 hash -a 0 password-seclists.txt
```
## MS word .doc
MS Office 1997-2003
```sh
office2john MS_Word_Document_97_2003.doc > hash

$ cat hash
MS_Word_Document_97_2003.doc:$oldoffice$4*f1efb1c529cff63cb08cf439df074c5d*9256d6abe8325534e7dae97f9f5967d9*8f015d410f45812c5e554ab7a147f1d9285ff6ea:::::MS_Word_Document_97_2003.doc

john --wordlist=password-seclists.txt hash
```
Using Hashcat
```sh
# Make the hashes compatible with hashcat
cat hash
$oldoffice$4*f1efb1c529cff63cb08cf439df074c5d*9256d6abe8325534e7dae97f9f5967d9*8f015d410f45812c5e554ab7a147f1d9285ff6ea

hashcat -m 9800 hash -a 0 password-seclists.txt
```
# WiFi
## WEP
```sh
# -b <bssid> : target selection: access point's MAC
aircrack-ng -b 00:21:91:d2:8e:25 WEP-Cracking.cap
```

