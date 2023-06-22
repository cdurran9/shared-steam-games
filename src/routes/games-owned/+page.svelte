<script>
	export let data;
	let desiredNums = ['4'];
	const numDict = {
		'4': 'All Four',
		'3': 'Only Three',
		'2': 'Only Two',
		'1': 'Only One'
	};
	const findShared = (gameArrays) => {
		const groupedObj = gameArrays.reduce((acc, curr) => {
			if (!acc[curr.appid]) {
				return {
					...acc,
					[curr.appid]: { ...curr, count: 1 }
				};
			} else {
				return {
					...acc,
					[curr.appid]: { ...acc[curr.appid], count: acc[curr.appid].count + 1 }
				};
			}
		}, {});
		return Object.values(groupedObj).reduce((acc, curr) => {
			return {
				...acc,
				[curr.count]: [...(acc[curr.count] ?? []), curr]
			};
		}, {});
	};
	const allGames = Object.values(data)
		.map((val) => val.games)
		.flat();
	const grouped = findShared(allGames);
</script>

<div class="numberInput">
	<label>
		<input type="checkbox" bind:group={desiredNums} name="desiredNums" value="4" />
		4
	</label>

	<label>
		<input type="checkbox" bind:group={desiredNums} name="desiredNums" value="3" />
		3
	</label>

	<label>
		<input type="checkbox" bind:group={desiredNums} name="desiredNums" value="2" />
		2
	</label>

	<label>
		<input type="checkbox" bind:group={desiredNums} name="desiredNums" value="1" />
		1
	</label>
</div>

<h1>Shared Steam Games</h1>
{#each desiredNums as num}
	<h3>Games Owned by {numDict[num]}</h3>
	<ul class="gameList">
		{#each grouped[num] as game}
			<li>
				<img
					src="https://cdn.cloudflare.steamstatic.com/steam/apps/{game.appid}/header.jpg"
					alt="Header for {game.name}"
					height="200"
				/>
				<span>{game.name}</span>
			</li>
		{/each}
	</ul>
{/each}

<style>
	.gameList {
		list-style: none;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 8px;
		row-gap: 16px;
	}

	.gameList li {
		padding: 8px;
		background-color: rgb(46, 42, 58);
		display: flex;
		flex-direction: column;
		width: 428px;
		height: calc(200px + 1.5rem);
		transition: transform 0.2s ease-out;
	}

	.gameList li:hover {
		transform: scale(1.1);
		-webkit-box-shadow: 0px 16px 31px 2px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 0px 16px 31px 2px rgba(0, 0, 0, 0.75);
		box-shadow: 0px 16px 31px 2px rgba(0, 0, 0, 0.75);
	}

	.gameList li span {
		text-align: center;
		font-size: 1.5rem;
	}
</style>
