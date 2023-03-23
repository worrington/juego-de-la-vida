import * as React from 'react';
import { useState } from 'react';

interface Props {
	matrixSize: number;
}

const Board: React.FC<Props> = ({
	matrixSize,
}) => {
	const [population, setPopulation] = useState<number>(0);
	const [generation, setGeneration] = useState<number>(0);
	const [populationList, setPopulationList] = useState<string[]>([]);

	const addRemovePopulation = (id: string) => {
		let copyPopulationList = populationList;

		if (populationList.includes(id)) {
			copyPopulationList = copyPopulationList.filter(item => item != id);
			setPopulation(population - 1);
		} else {
			copyPopulationList.push(id);
			setPopulation(population + 1);
		}
		setPopulationList(copyPopulationList);
	}

	const isLife = (id: string) => {
		if (populationList.includes(id)) {
			return true;
		}
		return false;
	}

	console.log(populationList);

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
								className={`${isLife(`td-${i}-${j}`) && "active" } border`}
								onClick={() => addRemovePopulation(`td-${i}-${j}`)}
							/>
						))}
					</tr>
				))}
			</table>
		</div>
	)};
export default Board;
