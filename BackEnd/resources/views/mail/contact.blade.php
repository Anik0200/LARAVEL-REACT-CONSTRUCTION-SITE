<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div>
        <h1>Message from {{ $data['name'] }}.</h1>
        <h4>{{ $data['email'] }}</h4>
        <h4>{{ $data['phone'] }}</h4>

        <p>{{ $data['subject'] }}</p>
        <p>{{ $data['message'] }}</p>
    </div>

</body>

</html>
