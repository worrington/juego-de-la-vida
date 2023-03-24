import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Controls from '../controls';

const Game: React.FC = () => {
	const [population, setPopulation] = useState<number>(0);
	const [generation, setGeneration] = useState<number>(0);
	const [matrixSize, setMatrixSize] = useState<number>(100);
	const [populationList, setPopulationList] = useState<Array<String>>([]);
	const [nextGenerationAutomatic, setNextGenerationAutomatic] = useState<Boolean>(false);
	const [border, setBorder] = useState<Boolean>(true);

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

	const addPopulation = useCallback((id: string, copy:Array<String>) => {
		setPopulation(population + 1);
		copy.push(id);
		return copy;
	}, [population]);

	const RemovePopulation = useCallback((id: string, copy:Array<String>) => {
		copy = copy.filter(item => item != id);
		setPopulation(population - 1);
		return copy;
	},[population]);

	const isLife = useCallback((id: string) => {
		return populationList.includes(id);
	}, [populationList]);

	const newPopulationList = (id: string) => {
		if (populationList.includes(id)) {
			setPopulationList(RemovePopulation(id, populationList));
		} else {
			setPopulationList(addPopulation(id, populationList));
		}
	}

	const totalNumberNeighbors = useCallback((i:number, j:number) => {
		let counter = 0;
		neighbors(i, j).map((item) => populationList.includes(item) && counter++);
		return counter;
	}, [populationList]);

	const nextGeneration = useCallback(() => {
		let copyPopulationList = Array.from(populationList);
		let neighbors = 0;
		let id = "";

		for (let i=0; i<=matrixSize-1; i++) {
			for (let j=0; j<=matrixSize-1; j++){
				neighbors = totalNumberNeighbors(i, j);
				id = `${i}-${j}`;
				if (isLife(id) && (neighbors < 2 || neighbors > 3 )) {
					copyPopulationList = RemovePopulation(id, copyPopulationList);
				}
				if (!isLife(id) && neighbors === 3) {
					copyPopulationList = addPopulation(id, copyPopulationList);
				}
			}
		}
		setGeneration(generation+1);
		setPopulation(copyPopulationList.length);
		setPopulationList(copyPopulationList);
	}, [RemovePopulation, addPopulation, generation, isLife, matrixSize, populationList, totalNumberNeighbors]);

	const clear = () =>  {
		setPopulationList([]);
		setGeneration(0);
		setPopulation(0);
		setNextGenerationAutomatic(false);
	}

	const autoplay = () => setNextGenerationAutomatic(!nextGenerationAutomatic);

	const whitBorder = () => setBorder(!border);

	useEffect(() => {
		if (nextGenerationAutomatic) {
			nextGeneration();
		}
	}, [populationList, nextGenerationAutomatic, nextGeneration]);

	return (
		<div className="board">
			<Controls
				population={population}
				generation={generation}
				nextGenerationAutomatic={nextGenerationAutomatic}
				border={border}
				autoplay={autoplay}
				nextGeneration={nextGeneration}
				clear={clear}
				whitBorder={whitBorder}
			/>
			{matrixSize != 0 && <div className="container-board">
				{Array.from({ length: matrixSize }).map((_, i) => (
					<div key={`tr-${i}`} className="div-board">
						{Array.from({ length: matrixSize }).map((_, j) => (
							<div
								id={`${i}-${j}`}
								key={`${i}-${j}`}
								className={`${isLife(`${i}-${j}`) && "active" } ${border && "border"} size-cell`}
								onClick={() => newPopulationList(`${i}-${j}`)}
							/>
						))}
					</div>
				))}
			</div>}
		</div>
	)};
export default Game;
