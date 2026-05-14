<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Assignment</title>
</head>
<body>
    <h2>New assignment in {{ $assignment->course->name }}</h2>
    <p><strong>Title:</strong> {{ $assignment->title }}</p>
    @if($assignment->description)
        <p>{{ $assignment->description }}</p>
    @endif
    @if($assignment->due_date)
        <p><strong>Due:</strong> {{ $assignment->due_date->format('M d, Y H:i') }}</p>
    @endif
    <p><strong>Posted by:</strong> {{ $assignment->createdBy?->first_name }} {{ $assignment->createdBy?->last_name }}</p>
</body>
</html>

