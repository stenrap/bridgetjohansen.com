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
                                   |-Schedule
                                   |-Calendar
                                   |-Policies
                                   |-Events
```                                 

### Technical
- SSL
  - How to get a free certificate from AWS?
  - ...

[1]: https://www.postgresql.org/docs/current/textsearch-intro.html
[2]: https://www.compose.com/articles/mastering-postgresql-tools-full-text-search-and-phrase-search/
