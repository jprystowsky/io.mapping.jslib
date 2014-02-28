var iojs = new function () {
	function MappingIoJsLib () {};

	MappingIoJsLib.prototype.Lambda = function (input) {
		function Lambda() {};

		Lambda.prototype._state = null;

		/**
		 * Initialize the lambda object.
		 * @param input
		 * @returns {Lambda}
		 */
		Lambda.prototype.init = function (input) {
			if (angular.isArray(input)) {
				this._state = angular.copy(input);
			} else {
				this._state = [input];
			}

			return this;
		};

		/**
		 * Return the state as an array.
		 * @returns {null|*}
		 */
		Lambda.prototype.toArray = function () {
			return this._state;
		};

		/**
		 * Map.
		 * @param callback
		 * @param args
		 * @returns {Lambda}
		 */
		Lambda.prototype.map = function (callback, args) {
			for (var i = 0; i < this._state.length; i++) {
				var obj = this._state[i];

				this._state[i] = callback.call(undefined, i, obj, args);
			}

			return this;
		};

		/**
		 * Internal fold method.
		 * @param accumulator
		 * @param direction
		 * @param callback
		 * @param args
		 * @returns {*}
		 * @private
		 */
		Lambda.prototype._fold = function (accumulator, direction, callback, args) {
			var currentValue = accumulator;

			if (direction < 0) {
				for (var i = 0; i < this._state.length; i++) {
					var obj = this._state[i];

					currentValue = callback.call(undefined, i, obj, currentValue, args);
				}
			} else {
				for (var i = this._state.length - 1; i >= 0; i--) {
					var obj = this._state[i];

					currentValue = callback.call(undefined, i, obj, currentValue, args);
				}
			}

			return currentValue;
		};

		/**
		 * Fold from the left.
		 * @param accumulator
		 * @param callback
		 * @param args
		 * @returns {*}
		 */
		Lambda.prototype.foldl = function (accumulator, callback, args) {
			return this._fold(accumulator, -1, callback, args);
		};

		/**
		 * Fold from the right.
		 * @param accumulator
		 * @param callback
		 * @param args
		 * @returns {*}
		 */
		Lambda.prototype.foldr = function (accumulator, callback, args) {
			return this._fold(accumulator, 1, callback, args);
		};

		/**
		 * Fold [from the left].
		 * @param accumulator
		 * @param callback
		 * @param args
		 * @returns {*}
		 */
		Lambda.prototype.fold = function (accumulator, callback, args) {
			return this.foldl(accumulator, callback, args);
		};


		Lambda.prototype._defaultProjectionFunction = function (index, object) { return object; };

		/**
		 * Average -- convenience fold[l] operation.
		 * @param projectionFunction
		 * @returns {number}
		 */
		Lambda.prototype.average = function (projectionFunction) {
			var avg = 0;

			if (!angular.isFunction(projectionFunction)) {
				projectionFunction = this._defaultProjectionFunction;
			}

			var i;
			for (i = 0; i < this._state.length; i++) {
				var obj = this._state[i];

				avg += projectionFunction.call(undefined, i, obj, avg);
			}

			return avg / i;
		};

		Lambda.prototype.sum = function (projectionFunction) {
			var sum = 0;

			if (!angular.isFunction(projectionFunction)) {
				projectionFunction = this._defaultProjectionFunction;
			}

			for (var i = 0; i < this._state.length; i++) {
				var obj = this._state[i];

				sum += projectionFunction(i, obj, sum);
			}

			return sum;
		};

		Lambda.prototype.filter = function (filterFunction) {
			for (var i = 0; i < this._state.length; i++) {
				var obj = this._state[i];

				if (!filterFunction.call(undefined, i, obj)) {
					this._state.splice(i, 1);
					i--;
				}
			}

			return this;
		};

		Lambda.prototype.reverse = function () {
			this._state = this._state.reverse();

			return this;
		};

		Lambda.prototype.sort = function (sortFunction) {
			this._state = this._state.sort(sortFunction);

			return this;
		};

		return new Lambda().init(input);
	};

	return new MappingIoJsLib();
};