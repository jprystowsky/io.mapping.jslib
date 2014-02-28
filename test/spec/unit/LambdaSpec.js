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

		it('should not affect an input array', function () {
			var input = [1, 2, 3],
				expectedOutput = [1, 2, 3];

			var lambda = iojs.Lambda(input);
			lambda._state[0]++;

			expect(input).toEqual(expectedOutput);
		});

		it('should not affect an input singleton integer', function () {
			var input = 1,
				expectedOutput = 1;

			var lambda = iojs.Lambda(input);
			lambda._state[0]++;

			expect(input).toEqual(expectedOutput);
		});

		it('should not affect an input singleton object', function () {
			var input = { x: 1 },
				expectedOutput = { x: 1 };

			var lambda = iojs.Lambda(input);
			lambda._state[0]['x']++;

			expect(input).toEqual(expectedOutput);
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

			var output = iojs.Lambda(input).map(function (v) {
				return v * v;
			}).toArray();;

			expect(output).toEqual(expectedOutput);
		});

		it('should pass along arguments', function () {
			var input = [1, 2, 3],
				multiplier = 10,
				expectedOutput = [10, 20, 30];

			var output = iojs.Lambda(input).map(function (v, t) {
				return v * t;
			}, multiplier).toArray();

			expect(output).toEqual(expectedOutput);
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

			var output = iojs.Lambda(input).fold(0, function (v, c) {
				return c + v;
			});

			expect(output).toEqual(expectedOutput);
		});

		it('should concatenate string inputs', function () {
			var input = ['one', 'two', 'three'],
				expectedOutput = 'onetwothree';

			var output = iojs.Lambda(input).fold('', function (v, c) {
				return c + v;
			});

			expect(output).toEqual(expectedOutput);
		});

		it('should pass along additional arguments', function () {
			var input = [0, 2, 4],
				letterArray = ['a', 'b', 'c', 'd', 'e'],
				expectedOutput = 'ace';

			var output = iojs.Lambda(input).fold('', function (v, cV, lA) {
				return cV + lA[v];
			}, letterArray);

			expect(output).toEqual(expectedOutput);
		});
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

			var output = iojs.Lambda(input).foldr('', function (v, c) {
				return c + v;
			});

			expect(output).toEqual(expectedOutput);
		});

		it('should pass along additional arguments', function () {
			var input = [0, 2, 4],
				letterArray = ['a', 'b', 'c', 'd', 'e'],
				expectedOutput = 'eca';

			var output = iojs.Lambda(input).foldr('', function (v, cV, lA) {
				return cV + lA[v];
			}, letterArray);

			expect(output).toEqual(expectedOutput);
		});
	});

	describe('filter', function () {
		it('should allow for true', function () {
			var input = [1, 2, 3],
				expectedOutput = [2];

			var output = iojs.Lambda(input).filter(function (x) { return x == 2; }).toArray();

			expect(output).toEqual(expectedOutput);
		});

		it('should deny for false', function () {
			var input = [1, 2, 3];

			var output = iojs.Lambda(input).filter(function () { return false; }).toArray();

			expect(output).toEqual([]);
		});

		it('should pass along arguments', function () {
			var input = [1, 2, 3],
				allow = 2,
				expectedOutput = [2];

			var output = iojs.Lambda(input).filter(function (v, a) {
				return v == a;
			}, allow).toArray();

			expect(output).toEqual(expectedOutput);
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
