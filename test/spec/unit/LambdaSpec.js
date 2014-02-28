describe('Lambda', function () {
	describe('init method', function () {
		it('should initialize an array as an array', function () {
			var inArray = [1, 2, 3];

			var outArray = iojs.Lambda(inArray).toArray();

			expect(outArray).toEqual(inArray);
		});

		it('should initialize a singleton as an array', function () {
			var input = 3.14;

			var outArray = iojs.Lambda(input).toArray();

			expect(outArray).toEqual([input]);
		});
	});

	describe('map', function () {
		it('should map each input', function () {
			var input = [1, 2, 3];

			var counter = 0;
			iojs.Lambda(input).map(function () {
				counter++;
			});

			expect(counter).toEqual(input.length);
		});

		it('should map inputs', function () {
			var input = [1, 2, 3],
				expectedOutput = [1, 4, 9];

			var lambda = iojs.Lambda(input).map(function (i, v) {
				return v * v;
			});

			expect(lambda.toArray()).toEqual(expectedOutput);
		});
	});

	describe('fold[l]', function () {
		it('should fold each input', function () {
			var input = [1, 2, 3];

			var counter = 0;
			iojs.Lambda(input).fold(0, function () {
				counter++;
			});

			expect(counter).toEqual(input.length);
		});

		it('should fold numeric inputs', function () {
			var input = [1, 2, 3],
				expectedOutput = 6;

			var output = iojs.Lambda(input).fold(0, function (i, v, c) {
				return c + v;
			});

			expect(output).toEqual(expectedOutput);
		});

		it('should concatenate string inputs', function () {
			var input = ['one', 'two', 'three'],
				expectedOutput = 'onetwothree';

			var output = iojs.Lambda(input).fold('', function (i, v, c) {
				return c + v;
			});

			expect(output).toEqual(expectedOutput);
		})
	});

	describe('foldr', function () {
		it('should fold each input', function () {
			var input = [1, 2, 3];

			var counter = 0;
			iojs.Lambda(input).foldr(0, function () {
				counter++;
			});

			expect(counter).toEqual(input.length);
		});

		it('should fold from the right', function () {
			var input = ['one', 'two', 'three'],
				expectedOutput = 'threetwoone';

			var output = iojs.Lambda(input).foldr('', function (i, v, c) {
				return c + v;
			});

			expect(output).toEqual(expectedOutput);
		});
	});

	describe('filter', function () {
		it('should allow for true', function () {
			var input = [1, 2, 3],
				expectedOutput = [2];

			var output = iojs.Lambda(input).filter(function (i, x) { return x == 2; }).toArray();

			expect(output).toEqual(expectedOutput);
		});

		it('should deny for false', function () {
			var input = [1, 2, 3];

			var output = iojs.Lambda(input).filter(function (i, x) { return false; }).toArray();

			expect(output).toEqual([]);
		});
	});

	describe('reverse', function () {
		it('should reverse its input', function () {
			var input = [1, 2, 3],
				expectedOutput = [3, 2, 1];

			var output = iojs.Lambda(input).reverse().toArray();

			expect(output).toEqual(expectedOutput);
		});

		it('should not change a singleton array', function () {
			var input = ['woof'];

			var output = iojs.Lambda(input).reverse().toArray();

			expect(output).toEqual(input);
		});
	});

	describe('sort', function () {
		it('should sort by default sort', function () {
			var input = [1, 3, 2],
				expectedOutput = [1, 2, 3];

			var output = iojs.Lambda(input).sort().toArray();

			expect(output).toEqual(expectedOutput);
		});

		it('should sort by a custom sorting function', function () {
			var input = [{a: 1, b: 3}, {a: 2, b: 1}, {a: 3, b: 2}],
				expectedOutput = [{a: 2, b: 1}, {a: 3, b: 2}, {a: 1, b: 3}];

			var output = iojs.Lambda(input).sort(function (x, y) {return y.b < x.b ? 1 : y.b === x.b ? 0 : -1;}).toArray();

			expect(output).toEqual(expectedOutput);
		});
	});
});
