# Database

## Table of Contents
* [Creation](#creation)
* [Migrations](#migrations)
* [Schema](#schema)

---

### Creation

1. Launch `pqsl` as the `postgres` user:
    
    `psql -U postgres`
    
1. Create the database:
    
    `CREATE DATABASE <PIANO_DB_NAME>;`
    
1. Create the user:
    
    `CREATE USER <PIANO_DB_USER> WITH PASSWORD '<PIANO_DB_PASSWORD>';`
    
1. Connect to the database:
    
    `\c <PIANO_DB_NAME>`
    
1. Grant `PIANO_DB_USER` access to all tables:
    
    `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <PIANO_DB_USER>;`
    
1. Quit as the `postgres` user:
    
    `\q`
    
1. Connect as `PIANO_DB_USER` (provide the password when prompted):
    
    `psql -U <PIANO_DB_USER> <PIANO_DB_NAME>`
    
---

### Migrations

*Due to [this db-migrate issue](https://github.com/db-migrate/node-db-migrate/issues/635), you must currently run migrations using node v8.9.4.*

1. Open a shell and change to the root directory of the project.
1. Switch to Node.js v8.9.4:
    
    `nvm use 8.9.4`
    
1. Run migrations:
    
    `npx db-migrate up`
    

Note that you'll need to address this before running migratins in AWS ([this](https://medium.com/@ymslavov/install-node-and-npm-via-nvm-on-aws-elastic-beanstalk-f1af763fd572) might work).

---

### Schema

#### `effective_date`

```
 id | month | date | year
----+-------+------+------
```

`id` - integer - populated automatically by a sequence  
`month` - integer - month when the lesson schedule is in effect (`0` - `11` => Jan - Dec)  
`date` - integer - date of the month when the lesson schedule is in effect (`1` - `31`)  
`year` - integer - 4-digit year when the lesson schedule is in effect

#### `students`

```
 id | name | lesson_day | lesson_hour | lesson_minutes | lesson_meridiem | lesson_duration
----+------+------------+-------------+----------------+-----------------+-----------------
```

`id` - integer - populated automatically by a sequence  
`name` - text - name of student  
`lesson_day` - integer - day of the week on which the lesson occurs (`0` - `6` => Sun - Sat)  
`lesson_hour` - integer - hour of the day when the lesson starts (`1` - `12`)  
`lesson_minutes` - integer - minutes of the hour when the lesson starts, in 5-minute increments with a max of 55 (`0` - `55` => 0 - 55)  
`lesson_meridiem` - text - meridiem of the lesson time (`am` or `pm`)  
`lesson_duration` - integer - duration of the lesson in minutes (`30`, `45`, `60`)

#### `parents`

```
 id | name | phone
----+------+-------
```

`id` - integer - populated automatically by a sequence  
`name` - text - name of parent(s)  
`phone` - text - phone number of parent(s)

#### `student_parents`

```
 id | student_id | parent_id
----+------------+-----------
```

`id` - integer - populated automatically by a sequence  
`student_id` - integer - foreign key reference to `students.id`  
`parent_id` - integer - foreign key reference to `parents.id`

#### `users`

```
 id | email | google_id | token | admin
----+-------+-----------+-------+-------
```

`id` - integer - populated automatically by a sequence  
`email` - text - email of the user  
`google_id` - text - Google's id for the user  
`token` - text - token used for authentication status  
`admin` - boolean - whether the user is an admin

#### `parent_users`

```
 id | parent_id | user_id
----+-----------+---------
```

`id` - integer - populated automatically by a sequence  
`parent_id` - integer - foreign key reference to `parents.id`  
`user_id` - integer - foreign key reference to `users.id`

#### `group_classes`

```
 id | month | date | year
----+-------+------+------
```

`id` - integer - populated automatically by a sequence  
`month` - integer - month when the group class occurs (`0` - `11` => Jan - Dec)  
`date` - integer - date of the month when the group class occurs (`1` - `31`)    
`year` - integer - 4-digit year when the group class occurs

#### `group_class_times`

```
 id | hour | minutes | meridiem | duration
----+------+---------+----------+----------
```

`id` - integer - populated automatically by a sequence  
`hour` - integer - hour of the day when the group class starts (`1` - `12`)  
`minutes` - integer - minutes of the hour when the group class starts, in 5-minute increments with a max of 55 (`0` - `55` => 0 - 55)  
`meridiem` - text - meridiem of the group class time (`am` or `pm`)  
`duration` - integer - duration of the group class in minutes (`30`, `45`, `60`)

#### `group_class_students`

```
 id | student_id | group_class_time_id
----+------------+---------------------
```

`id` - integer - populated automatically by a sequence  
`student_id` - integer - foreign key reference to `students.id`  
`group_class_time_id` - integer - foreign key reference to `group_class_times.id`

#### `events`

```
 id | name | date_and_time | location | expiration
----+------+---------------+----------+------------
```

`id` - integer - populated automatically by a sequence  
`name` - text - name of the event  
`date_and_time` - text - free-form date and time of the event (e.g. `Friday April 3rd from 6:00 - 8:00 pm`)   
`location` - text - location of the event  
`expiration` - timestamptz - date when the event expires

#### `photos`

```
 id | url | description
----+-----+-------------
```

`id` - integer - populated automatically by a sequence  
`url` - text - url of the photo in S3  
`description` - text - description of the photo
