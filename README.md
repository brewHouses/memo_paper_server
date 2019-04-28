# memo_paper_server

An electronic reminder, which would help you record things that flashed through your brain and recall them even if you reach to the edage of the galaxy with your wifi adaptor. Sounds amazing :).  

### Require
You MUST have mongodb installed on the env that the app will run, and start the mongod process.

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:8000
```

### TODO

- After md5, use ajex to transport username and password to server and wait return code, if the code is ok, then redirect /dashboard, else report error.
- Use the email to send the verification code, and replace the invitation code.// Or use the ink paper display the QR code when the first use, the user need to scan the QR code and get a number or some code else, when the user register, he/she need to input the code and the email verification code.
