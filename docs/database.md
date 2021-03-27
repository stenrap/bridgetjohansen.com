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
    
   `CREATE DATABASE <BRIDGET_DB_NAME>;`
    
1. Create the user:
    
   `CREATE USER <BRIDGET_DB_USER> WITH PASSWORD '<BRIDGET_DB_PASSWORD>';`
    
1. Connect to the database:
    
   `\c <BRIDGET_DB_NAME>`
    
1. Grant `BRIDGET_DB_USER` access to all tables:
    
   `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <BRIDGET_DB_USER>;`
    
1. Quit as the `postgres` user:
    
   `\q`
    
1. Connect as `BRIDGET_DB_USER` (provide the password when prompted):
    
   `psql -U <BRIDGET_DB_USER> <BRIDGET_DB_NAME>`
    

---

### Migrations

1. Open a shell and change to the root directory of the project.
1. Execute the following to run migrations:
    
    ```
    npm run db:migrate:dev
    ```
    

---

### Schema

#### `events`

```
 id | name | date_and_time | location | expiration
----+------+---------------+----------+------------
```

`id` - integer - populated automatically by an identity  
`name` - text - name of the event  
`date_and_time` - text - free-form date and time of the event (e.g. `Friday April 3rd from 6:00 - 8:00 pm`)   
`location` - text - location of the event  
`expiration` - timestamptz - date when the event expires

#### `group_class_students`

```
 id | student_id | group_class_time_id
----+------------+---------------------
```

`id` - integer - populated automatically by an identity  
`student_id` - integer - foreign key reference to `students.id`  
`group_class_time_id` - integer - foreign key reference to `group_class_times.id`

#### `group_class_times`

```
 id | hour | minutes | meridiem | duration
----+------+---------+----------+----------
```

`id` - integer - populated automatically by an identity  
`hour` - integer - hour of the day when the group class starts (`1` - `12`)  
`minutes` - integer - minutes of the hour when the group class starts, in 5-minute increments with a max of 55 (`0` - `55` => 0 - 55)  
`meridiem` - text - meridiem of the group class time (`am` or `pm`)  
`duration` - integer - duration of the group class in minutes (`30`, `45`, `60`)

#### `group_classes`

```
 id | month | date | year
----+-------+------+------
```

`id` - integer - populated automatically by an identity  
`month` - integer - month when the group class occurs (`0` - `11` => Jan - Dec)  
`date` - integer - date of the month when the group class occurs (`1` - `31`)    
`year` - integer - 4-digit year when the group class occurs

#### `schedule_effective_date`

```
 id | month | date | year
----+-------+------+------
```

`id` - integer - populated automatically by an identity  
`month` - integer - month when the lesson schedule is in effect (`0` - `11` => Jan - Dec)  
`date` - integer - date of the month when the lesson schedule is in effect (`1` - `31`)  
`year` - integer - 4-digit year when the lesson schedule is in effect

#### `student_contacts`

```
 id | name | phone | student_id
----+------+-------+------------
```

`id` - integer - populated automatically by an identity  
`name` - text - name of studio contact (could be a parent or an adult student)  
`phone` - text - phone number of studio contact  
`student_id` - integer - foreign key reference to `students.id`

#### `students`

```
 id | name | lesson_day | lesson_hour | lesson_minutes | lesson_meridiem | lesson_duration
----+------+------------+-------------+----------------+-----------------+-----------------
```

`id` - integer - populated automatically by an identity  
`name` - text - name of student  
`lesson_day` - integer - day of the week on which the lesson occurs (`0` - `6` => Sun - Sat)  
`lesson_hour` - integer - hour of the day when the lesson starts (`1` - `12`)  
`lesson_minutes` - integer - minutes of the hour when the lesson starts, in 5-minute increments with a max of 55 (`0` - `55` => 0 - 55)  
`lesson_meridiem` - text - meridiem of the lesson time (`am` or `pm`)  
`lesson_duration` - integer - duration of the lesson in minutes (`30`, `45`, `60`)

#### `users`

```
 id | admin | email | name | password | studio | token
----+-------+-------+------+----------+--------+-------
```

`id` - integer - populated automatically by an identity  
`admin` - boolean - whether the user is an admin  
`email` - text - email of the user  
`name` - text - name of the user  
`password` - text - password of the user  
`studio` - boolean - whether the user has studio access  
`token` - text - token used for authentication status
