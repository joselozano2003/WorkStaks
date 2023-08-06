import Image from 'next/image'


export const metadata = {
	title: 'StackWork Home',
	description: 'Home',
}

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold text-center">WorkStaks</h1>
		</main>
	)
}
