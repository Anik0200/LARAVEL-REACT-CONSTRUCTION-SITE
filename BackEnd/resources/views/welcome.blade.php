<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @else
        <style>
            body {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                color: #ffffff;
                display: flex;
                height: 100vh;
                align-items: center;
                justify-content: center;
                margin: 0;
            }

            .welcome-container {
                background: rgba(255, 255, 255, 0.1);
                padding: 3rem;
                border-radius: 15px;
                text-align: center;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .welcome-container:hover {
                transform: scale(1.05);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            }

            .btn-primary {
                padding: 0.7rem 2.5rem;
                font-size: 1.2rem;
                border-radius: 30px;
                background: #ffffff;
                color: #2575fc;
                font-weight: bold;
                transition: all 0.3s;
            }

            .btn-primary:hover {
                background: #2575fc;
                color: #ffffff;
                transform: translateY(-3px);
            }

            .icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                animation: bounce 2s infinite;
            }

            @keyframes bounce {

                0%,
                20%,
                50%,
                80%,
                100% {
                    transform: translateY(0);
                }

                40% {
                    transform: translateY(-20px);
                }

                60% {
                    transform: translateY(-10px);
                }
            }
        </style>
    @endif
</head>

<body class="font-sans antialiased">

    <div class="welcome-container">
        <div class="icon">🎉</div>
        <h1 class="mb-3">Welcome to Our Site!</h1>
        <p class="mb-4">We’re excited to have you here. Discover amazing features and start your journey with us!</p>
        <a href="#" class="btn btn-primary">Explore Now</a>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
