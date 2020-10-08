describe('make js board function tests', function() {
	it('should return an array with same number of elements as HEIGHT', function() {
		expect(makeBoard(1000, 10).length).toEqual(1000);
	});

	it('should return same WIDTH for every element in arr', function() {
		const result = makeBoard(1000, 1000).map((e) => e.length).every(function(e) {
			return e === 1000;
		});
		expect(result).toEqual(true);
	});
});

describe('switch players test', function() {
	it('should return 2 since currPlayer === 1', function() {
		currPlayer = 1;
		expect(switchPlayers(1)).toEqual(2);
	});
	it('should return 1 since currPlayer === 2', function() {
		currPlayer = 2;
		expect(switchPlayers(2)).toEqual(1);
	});
});

describe('check for tie test', function() {
	it('should return true when all cells in every row are filled with a truthy value', function() {
		let tieBoard = [
			[ 1, 1, 2, 3, 5 ],
			[ 1, 2, 3, 4, 5 ],
			[ 1, 2, 3, 4, 5 ],
			[ 1, 2, 3, 4, 5 ],
			[ 1, 2, 3, 4, 5 ]
		];
		expect(checkForTie(tieBoard)).toEqual(true);
	});

	// it('should return false when not all cells in every row are filled with a truthy value', function() {});
});
