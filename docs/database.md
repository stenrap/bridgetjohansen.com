## Database

#### `schedule`

```
 id | month | date | year
----+-------+------+------
```

`id` - integer - populated automatically by a sequence  
`month` - integer - month when the lesson schedule is in effect (`0` - `11` => Jan - Dec)  
`date` - integer - date of the month when the lesson schedule is in effect (`1` - `31`)  
`year` - integer - 4-digit year when the lesson schedule is in effect

---

#### `students`

```
 id | name | parents | phone | lesson_day | lesson_hour | lesson_minutes | lesson_duration
----+------+---------+-------+------------+-------------+----------------+-----------------
```

`id` - integer - populated automatically by a sequence  
`name` - text - name of student  
`parents` - text - name(s) of student's parent(s)  
`phone` - text - phone number of student/parent(s)  
`lesson_day` - integer - day of the week on which the lesson occurs (`0` - `6` => Sun - Sat)  
`lesson_hour` - integer - hour of the day when the lesson starts (`0` - `23` => 12:00 am - 11:00 pm)  
`lesson_minutes` - integer - minutes of the hour when the lesson starts, in 5-minute increments with a max of 55 (`0` - `55` => 0 - 55)  
`lesson_duration` - integer - duration of the lesson in minutes (also 5-minute increments, but with no max)

---

#### `group_class_dates`

```
 id | month | date | year
----+-------+------+------
```

`id` - integer - populated automatically by a sequence  
`month` - integer - month when the group class occurs (`0` - `11` => Jan - Dec)  
`date` - integer - date of the month when the group class occurs (`1` - `31`)    
`year` - integer - 4-digit year when the group class occurs

---

#### `group_class_times`

```
 id | hour | minutes
----+------+---------
```

`id` - integer - populated automatically by a sequence  
`hour` - integer - hour of the day when the group class starts (`0` - `23` => 12:00 am - 11:00 pm)  
`minutes` - integer - minutes of the hour when the group class starts, in 5-minute increments with a max of 55 (`0` - `55` => 0 - 55)

---

#### `group_class_student_times`

```
 id | student_id | group_class_time_id
----+------------+---------------------
```

`id` - integer - populated automatically by a sequence  
`student_id` - integer - foreign key reference to `students.id`  
`group_class_time_id` - integer - foreign key reference to `group_class_times.id`

---

#### `events`

```
 id | name | date_and_time | location | expiration
----+------+---------------+----------+------------
```

`id` - integer - populated automatically by a sequence  
`name` - text - name of the event  
`date_and_time` - text - free-form date and time of the event (e.g. `Friday April 3rd from 6:00 - 8:00 pm`)   
`location` - text - location of the event

---

#### `photos`

```
 id | url | description
----+-----+-------------
```

`id` - integer - populated automatically by a sequence  
`url` - text - url of the photo in S3  
`description` - text - description of the photo
