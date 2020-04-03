## Database

#### `schedule`
| `id` | `month` | `date` | `year` |
|------|---------|--------|--------|

`id` - integer - populated automatically by a sequence  
`month` - integer - month when the lesson schedule is in effect, where `0` represents January and `11` represents December  
`date` - integer - date of the month when the lesson schedule is in effect, where `1` represents the first day and the last day can go up to `31`  
`year` - integer - 4-digit year when the lesson schedule is in effect

---

#### `students`

| `id` | `first_name` | `last_name` | `parents` | `phone` |
|------|--------------|-------------|-----------|---------|

`id` - integer - populated automatically by a sequence  
`first_name` - text - first name of student  
`last_name` - text - last name of student  
`parents` - text - name(s) of student's parent(s)  
`phone` - text - phone number of student/parent(s)

---

#### `lessons`
| `id` | `student_id` | `day` | `hour` | `minutes` | `duration` |
|------|--------------|-------|--------|-----------|------------|

`id` - integer - populated automatically by a sequence  
`student_id` - integer - foreign key reference to `students.id`  
`day` - integer - day of the week on which the lesson occurs, where `0` represents Sunday and `6` represents Saturday  
`hour` - integer - hour of the day when the lesson starts, where `0` represents 12:00 am and `23` represents 11:00 pm  
`minutes` - integer - minutes of the hour when the lesson starts, where `0` represents :00 and `59` represents :59  
`duration` - integer - duration of the lesson, in minutes

---

#### `group_classes`

| `id` | `month` | `date` | `year` |
|------|---------|--------|--------|

TODO: Maybe the way to model this is:

- each group class has one or more months
- each group class month has one or more dates
- each group class date has one or more times
- each group class time has one or more students
