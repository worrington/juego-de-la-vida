import * as React from 'react';
import { useState } from 'react';

interface Props {
	matrixSize: number;
}

const Board: React.FC<Props> = ({
	matrixSize,
}) => {
	const [population, setPopulation] = useState<null | number>(0);
	const [generation, setGeneration] = useState<null | number>(0);
	const [populationList, setPopulationList] = useState<[]>([]);

	return (
		<div>
			<div>
				Población: {population}
			</div>
			<div>
				Generaciones: {generation}
			</div>
			<table>
				{Array.from({ length: matrixSize }).map((_, i) => (
					<tr key={`tr-${i}`}>
						{Array.from({ length: matrixSize }).map((_, j) => (
							<td
								id={`td-${i}-${j}`}
								key={`td-${i}-${j}`}
								className={"border"}
							/>
						))}
					</tr>
				))}
			</table>
		</div>
	)};
export default Board;
