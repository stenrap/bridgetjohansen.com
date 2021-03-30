### Development Environment Setup

1. Create a self-signed certificate for local.bridgetjohansen.com that expires in 10 years (do this from the /certs directory):
    
    ```
    openssl req -x509 -days 3650 -out local.bridgetjohansen.com.crt -keyout local.bridgetjohansen.com.key \
      -newkey rsa:2048 -nodes -sha256 -subj '/CN=local.bridgetjohansen.com' -extensions EXT \
      -config <(printf "[dn]\nCN=local.bridgetjohansen.com\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:local.bridgetjohansen.com\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
    ```
    
1. Double-click on the `local.bridgetjohansen.com.crt` file to import it into the macOS Keychain Access app.
1. In the Keychain Access app, double-click the `local.bridgetjohanse.com` certificate to open it.
1. Expand the certificate's `Trust` setting.
1. Set the `When using this certificate` option to `Always Trust`.
1. SSH into your gateway device (password is in 1Password):
    
    ```
    ssh admin@192.168.1.1
    ```
    
1. Open the file that lets you map domain names to IP addresses:
    
    ```
    sudo vi /etc/dnsmasq.d/dnsmasq.static.conf
    ```
    
1. Add the desired mapping and save the file:
    
    ```
    address=/local-api.wordit.app/192.168.1.9
    ```
    
1. Reload the config:
    
    ```
    sudo /etc/init.d/dnsmasq force-reload
    ```
    
You should now be able to access https://local.bridgetjohansen.com:3000 in your browsers (you might have to accept the "risks" in Firefox and type `thisisunsafe` in Chrome).

### Features

- Blog
  - Advertising
    - ...
  - Rich editing
    - Text (bold, italics, underline)
    - Embedded photos and videos
    - Custom slug
    - Preview
    - Scheduled release
    - ...
  - SEO
    - Server-side rendering
    - Each blog post link should be a slug, not an id
    - ...
- Search the blog/resources
  - Distinguish results and show resources first
  - [PostgreSQL documentation][1]
  - [Helpful article][2]
  - ...
- Studio
  - User account information will not be linked to the studio in any way. Bridget will enter all information about students and their contact(s).
  - As indicated by the previous bullet, there's no such thing as "parents". Instead there are "student contacts"—the people who can be contacted about a student
     (and in the case of an adult student, they will be their own student contact)
  - Bridget can create an account for a new parent (or adult student) with studio access, and they receive an email that prompts them to set a password.
    - But this doesn't create a record in the `students` or `student_contacts` tables (see the first bullet). It only creates a record in the `users` table.
  - If an existing user needs studio access, Bridget can search for them by email and grant it.
- Teaching Resources
  - Each resource is a separate page, and can be purchased individually:
    - How to start a studio
    - How to hold a successful recital
    - Videos of Bridget teaching a student for a year
      - The first lesson in the series could be free
      - Maybe 40 lessons total
    - Printable resources
    - ...
  - ...

### Design Ideas
- Good use of white space
- 

### Site Navigation

```
Home | About | Teaching Resoures | Studio | Blog | Sign In | Search
                                   |-About
                                   |-Schedule
                                   |-Calendar
                                   |-Policies
                                   |-Events
                                   |-Photos (v3.?)
```                                 

- Studio will be its own "About" page just for piano
- When you land on the Studio page, you'll be on the `About` tab of this sub navigation (see GitHub for inspiration):
    
    ```
    About | Schedule | Calendar | Policies | Events | Photos (v3.?)
    ```
    

### Technical
- SSL
  - How to get a free certificate from AWS?
  - ...

[1]: https://www.postgresql.org/docs/current/textsearch-intro.html
[2]: https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/
