import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
	return (
		<Html lang="ru">
			<Head>
				<meta charSet="utf-8"/>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet"/>

				<title>Allconnect</title>
				<link rel="icon" href="%PUBLIC_URL%/favicon.ico" type="image/x-icon"/>
				<meta name="theme-color" content="#000000"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<meta name="description" content="Next generation social platform"/>
				<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png"/>
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json"/>
			</Head>
			<body>
			<Main/>
			<NextScript/>
			</body>
		</Html>
	)
}
