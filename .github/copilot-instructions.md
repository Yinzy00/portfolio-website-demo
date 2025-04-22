Only do exactly what is asked. Don't update additional files to make them better formated or add comments.

### Tech Stack

- dotnet 9, c#
- mediatr (cqrs)
- domain‑driven design

### Folder Layout

- work feature based: folder per feature in the Portfolio.Library project
    - So all feature logic should be in the Library project
- files stay small;

### Models

- live in the `/Domain` sub‑folder of the feature
- follow ddd: entities own behaviour; use value objects where it helps

### Controllers

- one controller, one action
    - examples: `GetAppointmentsController`, `CreateAppointmentController`
- keep controllers thin: no logic, only `mediator.Send(...)`
- Controllers should be located in the feature folder in the Library project.

### MediatR

- every request + handler sit in the **same file**
- use clear names: e.g. `CreateAppointmentCommand` or `GetAppointmentQuery`
- Don't use services for code that isnt being reused, put the code directly in the handler for that part of the feature. Only put a function in a service if it is being reused in multiple handlers.
- every bit of crud goes through handlers; nowhere else touches the db

### Sample Layout

```
Appointments/
 ├─ Domain/
 │   └─ Appointment.cs
 ├─ Create/
 │   ├─ CreateAppointmentController.cs
 │   └─ CreateAppointmentCommand.cs   // record + handler
 ├─ Get/
 │   ├─ GetAppointmentsController.cs
 │   └─ GetAppointmentsQuery.cs       // record + handler

```

### Coding Style

- keep names short and clear
- prefer records for requests and immutable data
- validate input early with simple guard clauses or fluent validation

### Database

- Use a json file as database for development and testing purposes. This file should be located in the `Data` folder of the project. The file should be named `[Domain].json` and should contain a JSON array of objects representing the data in the database. As if each file is a database table.