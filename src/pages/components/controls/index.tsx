import * as React from 'react';

interface Props {
	population: number;
	generation: number;
	nextGenerationAutomatic: Boolean;
	border: Boolean;
	autoplay: () => void;
	nextGeneration: () => void;
	clear: () => void;
	whitBorder: () => void;
}

const Controls: React.FC<Props> = ({
	population,
	generation,
	border,
	nextGenerationAutomatic,
	autoplay,
	nextGeneration,
	clear,
	whitBorder,
}) => {
	
	return (
		<div className="controls container">
			<div className="row">
				<div className="col-sm">
					<p>Población: {population}</p>
					<p>Generaciones: {generation}</p>
				</div>
				<div className="col">
					<button onClick={nextGeneration} className="btn btn-success m-1">
						Next Generation
					</button>
					<button onClick={autoplay} className="btn btn-info m-1">
						{nextGenerationAutomatic ? "Stop" : "Play"}
					</button>
					<button onClick={clear} className="btn btn-primary m-1">
						Clear
					</button>
					<button onClick={whitBorder} className="btn btn-warning m-1">
						{border ? "Borderless" : "Border"}
					</button>
				</div>
			</div>
		</div>
	)};
export default Controls;
