describe('make js board function tests', function() {
	it('should create an array', function() {
		expect(Array.isArray(makeBoard(5, 6))).toEqual(true);
	});

	it('should create an array of rows (y)', function() {
		expect(Array.isArray(board1)).toEqual(true);
	});

	it('should create an array of of cells (x) for each row (y)', function() {
		expect(Array.isArray(board1[0])).toEqual(true);
	});

	it('should make a board the size of values (height, width) passed', function() {
		expect(board1.length).toEqual(6);
		expect(board1[0].length).toEqual(7);
		expect(board1[5].length).toEqual(7);

		expect(board2.length).toEqual(3);
		expect(board2[0].length).toEqual(4);
		expect(board2[2].length).toEqual(4);

		expect(makeBoard(7, 8).length).toEqual(7);
		expect(makeBoard(7, 8)[6].length).toEqual(8);

		expect(makeBoard(HEIGHT, WIDTH).length).toEqual(HEIGHT);
		expect(makeBoard(HEIGHT, WIDTH)[5].length).toEqual(WIDTH);
	});
});

describe('switch players test', function() {});
