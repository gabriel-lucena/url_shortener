<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheets/style.css">
    <title>{{title}}</title>
</head>
<body>
    <main>
        <form action="/" method="POST">
            <input type="text" name="url" placeholder="type the url" name="url">
            <input type="submit" value="Shorten">
        </form>
    </main>

    <h1 id="new-url">{{code}}</h1>
    <footer> URL SHORTENER &copy; Gabriel Oliveira / 2020</footer>
</body>
</html>