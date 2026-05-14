<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Announcement</title>
</head>
<body>
    <h2>New announcement in {{ $announcement->course->name }}</h2>
    <p><strong>Posted by:</strong> {{ $announcement->createdBy?->first_name }} {{ $announcement->createdBy?->last_name }}</p>
    <p>{{ $announcement->body }}</p>
</body>
</html>

