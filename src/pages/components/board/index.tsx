import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

interface Props {
	matrixSize: number;
}

const Board: React.FC<Props> = ({
	matrixSize,
}) => {
	const [population, setPopulation] = useState<number>(0);
	const [generation, setGeneration] = useState<number>(0);
	const [populationList, setPopulationList] = useState<Array<String>>([]);

	const addPopulation = (id: string, copy:Array<String>) => {
		copy.push(id);
		setPopulation(population + 1);
		return copy;
	}
	const RemovePopulation = (id: string, copy:Array<String>) => {
		copy = copy.filter(item => item != id);
		setPopulation(population - 1);
		return copy;
	}

	const newPopulationList = (id: string) => {
		if (populationList.includes(id)) {
			setPopulationList(RemovePopulation(id, populationList));
		} else {
			setPopulationList(addPopulation(id, populationList));
		}
	}

	const isLife = useCallback((id: string) => {
		return populationList.includes(id);
	}, [populationList]);

	const neighbors = (i:number, j:number) => [
		`${i-1}-${j-1}`,
		`${i-1}-${j}`,
		`${i-1}-${j+1}`,
		`${i}-${j-1}`,
		`${i}-${j+1}`,
		`${i+1}-${j-1}`,
		`${i+1}-${j}`,
		`${i+1}-${j+1}`,
	];

	const totalNumberNeighbors = (i:number, j:number) => {
		let cont = 0;
		neighbors(i, j).map((item) => {
			if(populationList.includes(item)) {
				cont++;
			}
		});
		return cont;
	}

	const nextGeneration = () => {
		let copyPopulationList = Array.from(populationList);
		let neighbors = 0;
		let id = "";
		for (let i=0; i<=matrixSize-1; i++) {
			for (let j=0; j<=matrixSize-1; j++){
				neighbors = totalNumberNeighbors(i, j);
				id = `${i}-${j}`;
				if(isLife(id)){
					if (neighbors < 2 || neighbors > 3 ) {
						copyPopulationList = RemovePopulation(id, copyPopulationList);
					}
				}
				if(!isLife(id) && neighbors === 3) {
					copyPopulationList = addPopulation(id, copyPopulationList);
				}
			}
		}
		setGeneration(generation+1);
		setPopulationList(copyPopulationList);
	};

	const clear = () =>  {
		setPopulationList([]);
		setGeneration(0);
		setPopulation(0);
	}

	useEffect(() => {
		
	}, [populationList, generation]);

	return (
		<div>
			<div>
				Población: {population}
			</div>
			<div>
				Generaciones: {generation}
			</div>
			<button onClick={nextGeneration}>Next Generation</button>
			<button onClick={() => clear()}>Borrar</button>
			<table>
				<td><tr>h</tr></td>
				{Array.from({ length: matrixSize }).map((_, i) => (
					<tr key={`tr-${i}`}>
						{Array.from({ length: matrixSize }).map((_, j) => (
							<td
								id={`${i}-${j}`}
								key={`${i}-${j}`}
								className={`${isLife(`${i}-${j}`) && "active" } border`}
								onClick={() => newPopulationList(`${i}-${j}`)}
							/>
						))}
					</tr>
				))}
			</table>
		</div>
	)};
export default Board;
