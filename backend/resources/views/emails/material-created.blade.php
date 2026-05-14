<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Material</title>
</head>
<body>
    <h2>New material in {{ $material->course->name }}</h2>
    <p><strong>Title:</strong> {{ $material->title }}</p>
    @if($material->description)
        <p>{{ $material->description }}</p>
    @endif
    <p><strong>Posted by:</strong> {{ $material->createdBy?->first_name }} {{ $material->createdBy?->last_name }}</p>
</body>
</html>

