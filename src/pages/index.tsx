import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Game from './components/game';

export default function Home() {
	return (
		<>
			<Head>
				<title>Juego de la vida</title>
				<meta name="description" content="es un autómata celular diseñado por el matemático británico John Horton Conway en 1970" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="" />
			</Head>
			<main className={styles.main}>
				<h3>Juego de la vida</h3>
				<Game />
			</main>
		</>
	)
}
