import * as React from 'react';

interface Props {
	population: number;
	generation: number;
	autoplay: () => void;
	nextGeneration: () => void;
	clear: () => void;
}

const Controls: React.FC<Props> = ({
	population,
	generation,
	autoplay,
	nextGeneration,
	clear,
}) => {
	
	return (
		<div>
			<div>
				Población: {population}
			</div>
			<div>
				Generaciones: {generation}
			</div>
			<button onClick={nextGeneration}>Next Generation</button>
			<button onClick={autoplay}>Play</button>
			<button onClick={clear}>Clear</button>
		</div>
	)};
export default Controls;
