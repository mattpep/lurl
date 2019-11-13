# lurl
little url app

There are lots of public URL shortners. This is my own.

# Functionality

This app has no mechanism (from the web) to add URLs. This is intentional, as
it prevents the need to write a login or authentication system.

# Configuration

This is run as a resident nodejs app.

Two optional environent variables exist:
* `REDIS_URL` - the location of the redis server: `redis://[:password@]host[:port][/db-number]`
* `PORT` - the TCP port on which to run the app (You won't need to set this if using docker)

The key is specified as the URL segment immediately after the nodename. No querystring parameters are used.

# License

Written by Matt Peperell (@mattpep), licensed under [MIT](LICENSE.TXT)
