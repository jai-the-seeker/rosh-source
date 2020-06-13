---
title: Forensics
sidebar_label: Forensics
---

# Forensics
## Basic Commands
```sh
# check the format type for the given image.
img_stat evidence.img

# check the file system type and the last mounted directory of the given image.
fsstat evidence.img

# list all the directories on the root directory of the disk image.
fls evidence.img

# extract the file flag.txt from the disk image file. 
# Here 16 is the inode number of the file flag.txt on the image, 
# which can be obtained from the fls command above.
icat evidence.img 16

```
