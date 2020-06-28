* [HTTP Authentication](#http-authentication)
  * [HTTP basic authentication](#http-basic-authentication)
  * [Digest Authentication](#digest-authentication)
  * [Token Authentication](#token-authentication)
* [Perform an HTTP GET request](#perform-an-http-get-request)
* [HTTP Response Headers](#http-response-headers)
  * [response headers `i`](#response-headers-i)
  * [Only response headers `I`](#only-response-headers-I)
* [Perform an HTTP POST request](#perform-an-http-post-request)
* [Perform an HTTP POST request sending JSON](#perform-an-http-post-request-sending-json)
* [Perform an HTTP PUT request](#perform-an-http-put-request)
* [Follow a redirect](#follow-a-redirect)
* [Store the response to a file](#store-the-response-to-a-file)
* [Set a different User Agent](#set-a-different-user-agent)
* [Inspecting all the details of the request and the response](#inspecting-all-the-details-of-the-request-and-the-response)
* [Proxy `-x`](#proxy)
  * [username and password for proxy](#username-and-password-for-proxy)
  * [username and password for HTTP server](#username-and-password-for-HTTP-server)
* [Copying any browser network request to a curl command](#copying-any-browser-network-request-to-a-curl-command)

Refs
* <https://flaviocopes.com/http-curl/>
* <https://curl.haxx.se/docs/manual.html>

# HTTP Authentication
## HTTP basic authentication
If a resource requires Basic HTTP Authentication, you can use the `u` option to pass the `user:password values`:
```sh
curl -u user:pass https://flaviocopes.com/
curl -u bob:qwerty http://192.165.34.3/dir/
```
## Digest Authentication
```sh
curl --digest -u alice:password1 http://192.165.34.3/poc/
```
## Token Authentication
We have to set the token in headers for token authentication to work.
```sh
curl -H 'Authorization: Token <token>' 192.183.171.3
```
We have to write a custom wrapper around this command. In the script, we will rely on the fact
that on using the correct token, we will get something else than "Unauthorized Access".

You can refer this script <https://github.com/jai-the-seeker/CTF-OSCP/blob/master/scripts.md#authorization-token>

After performing the dictionary attack we will get the password, which can be used to set the token in the headers
```sh
# -H, --header <header/@file> Pass custom header(s) to server
curl -H 'Authorization: Token 123123123' 192.186.248.3
```
# Perform an HTTP GET request
When you perform a request, curl will return the body of the response:
```sh
curl https://flaviocopes.com/
```
# HTTP response headers
## response headers `i`
By default the response headers are hidden in the output of curl. To show them, use the `i` option:
```sh
curl -i https://flaviocopes.com/
```
## Only response headers `I`
Using the `I` option, you can get only the headers, and not the response body:
```sh
curl -I https://flaviocopes.com/
```
# Perform an HTTP POST request
The `X` option lets you change the `HTTP` method used. By default, `GET` is used, and it’s the same as writing
```sh
curl -X GET https://flaviocopes.com/
```
Using `-X POST` will perform a `POST` request. You can perform a POST request passing data URL encoded:
```sh
curl -d "option=value&something=anothervalue" -X POST https://flaviocopes.com/
```
In this case, the `application/x-www-form-urlencoded Content-Type` is sent.

# Perform an HTTP POST request sending JSON
Instead of posting data URL-encoded, like in the example above, you might want to send JSON. In this case you need to explicitly set the Content-Type header, by using the `H` option:
```sh
curl -d '{"option": "value", "something": "anothervalue"}' -H "Content-Type: application/json" -X POST https://flaviocopes.com/
```
You can also send a JSON file from your disk:
```sh
curl -d "@my-file.json" -X POST https://flaviocopes.com/
```
# Perform an HTTP PUT request
The concept is the same as for `POST` requests, just change the `HTTP method` using `-X PUT`

# Follow a redirect
A redirect response like 301, which specifies the Location response header, can be automatically followed by specifying the `L` option:
```sh
curl http://flaviocopes.com/
```
will not follow automatically to the HTTPS version which I set up to redirect to, but this will:
```sh
curl -L http://flaviocopes.com/
```
# Store the response to a file
Using the `o` option you can tell curl to save the response to a file:
```sh
curl -o file.html https://flaviocopes.com/
```
You can also just save a file by its name on the server, using the O option:
```sh
curl -O https://flaviocopes.com/index.html
```

# Set a different User Agent
The user agent tells the server which client is performing the request. By default curl sends the `curl/<version> user agent, like: curl/7.54.0.`

You can specify a different user agent using the `--user-agent` option:
```sh
curl --user-agent "my-user-agent" https://flaviocopes.com
```
# Inspecting all the details of the request and the response
Use the `--verbose` option to make curl output all the details of the request, and the response:
```sh
curl --verbose -I https://flaviocopes.com/
```
# proxy
```sh
-x, --proxy [protocol://]host[:port]
curl -x 192.201.208.3:3128 127.0.0.1
```
The proxy string can be specified with a protocol:// prefix. No protocol specified or http:// will be treated as HTTP proxy. Use socks4://, socks4a://, socks5:// or socks5h:// to request a specific SOCKS version to be used.

## username and password for proxy
In order to pass the credentials to the proxy server, we can use the curl option `-U`. Therefore, the following command will work:
```sh
curl -U admin:laurie -x 192.173.117.3:3128 127.0.0.1:1996
```
Alternatively,
```sh
# curl -x <[protocol://][user:password@]proxyhost[:port]> url
# Example 1
curl -x http://user:password@proxy-IP-here:port url-of-website:port
# Example 2
curl -x admin:laurie@192.142.49.3:3128 127.0.0.1:1996
```

## username and password for HTTP server
```sh
# Get a file from an HTTP server that requires user and password, using the proxy:
curl -u user:passwd -x my-proxy:888 http://www.get.this/
```

The curl `-u` option is used to specify credentials for the *target* server authentication and not for the *proxy* server authentication.

For e.g, when you are using the command `curl -u admin:laurie -x 192.173.117.3:3128 127.0.0.1:1996`. The credentials `admin:laurie` are *not* being passed as credentials to the proxy server, instead, they are passed as a part of the request which is supposed to be forwarded to the target server.  The option value will be considered as credentials for the target server authentication and not for the proxy authentication.

The above command will work in the scenario where the proxy server is configured without authentication, but the target server is protected with authentication (basic/digest authentication). This way, the connection will be forwarded by the proxy server and the credentials will be used to authenticate with the target server.




